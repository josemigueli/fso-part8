/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoginValue } from '../LoginContext'
import Container from 'react-bootstrap/esm/Container'
import Table from 'react-bootstrap/esm/Table'
import { useQuery } from '@apollo/client'
import { ME, BOOKS_BY_GENRE } from '../queries'

const Recommendations = () => {
    const [render, setRender] = useState(true)
    const [genre, setGenre] = useState(null)
    const token = useLoginValue()
    const navigate = useNavigate()
   const getBooks = useQuery(BOOKS_BY_GENRE, {
        variables: { genre },
        skip: !genre
   })
    const result = useQuery(ME)
    let user

    const showBooks = ({ data }) => {
        if (!data || data.allBooks.length < 1) {
            return (
                <div>
                    <p>No recommendations...</p>
                </div>
            )
        }

        return (
            <Table striped bordered hover>
                <tbody>
                <tr>
                    <th>Name</th>
                    <th>Author</th>
                    <th>Published</th>
                </tr>
                {data.allBooks.map((a) => (
                    <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        )
    }

    useEffect(() => {
        if (render) {
            setRender(false)
            return
        }
        if (!token) {
            navigate('/')
        }
    }, [render, token])

    useEffect(() => {
        if (user) {
            setGenre(user.favoriteGenre)
        }
    }, [result])

    if (result.loading) {
        return <Container><p>Loading...</p></Container>
    }
    user = result.data.me

    if (!token) {
        return null
    }
    return (
        <Container>
            <h2>Recommendations</h2>
            <div>
                <p>Books in your favorite genre <b>{user.favoriteGenre}</b></p>
                {showBooks(getBooks)}
            </div>
        </Container>
    )
}

export default Recommendations