/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, BOOKS_BY_GENRE } from '../queries'
import Container from 'react-bootstrap/esm/Container'
import Table from 'react-bootstrap/esm/Table'
import Button from 'react-bootstrap/esm/Button'
import { useLoginValue } from '../LoginContext'


const Books = () => {
  const token = useLoginValue()
  const navigate = useNavigate()
  const [books, setBooks] = useState([])
  const [render, setRender] = useState(true)
  const [genre, setGenre] = useState(null)
  const result = useQuery(ALL_BOOKS)
  const getByGenre = useQuery(BOOKS_BY_GENRE, {
    variables: { genre },
    skip: !genre
  })
  let allBooks

  const filter = (term) => {
    setGenre(term)
    if (term === 'All genres') {
      setBooks(allBooks)
      return
    }
  }

  useEffect(() => {
    if (render) {
      setRender(false)
      return
    }
    if (!token) {
      navigate('/login')
    }
  }, [render, token])

  useEffect(() => {
    if (allBooks) {
      setBooks(allBooks)
      setGenre('All genres')
    }
  }, [result])

  useEffect(() => {
    if (getByGenre.data && genre !== 'All genres') {
      setBooks(getByGenre.data.allBooks)
    }
  }, [getByGenre])

  if (result.loading) {
    return <Container><p>Loading...</p></Container>
  }

  allBooks = result.data.allBooks
  const genres = allBooks
    .flatMap(b => b.genres)
    .filter((element, index, self) => {
      return self.indexOf(element) === index
    })

  if (!token) {
    return null
  }

  return (
    <Container className='mb-5'>
      <h2>Books</h2>

      <div className='mb-3'>
        <p>Filtered by: <b>{genre}</b></p>
        <div>
          <Button 
            type='button'
            variant={genre === 'All genres' ? 'outline-secondary' : 'primary'} 
            className='me-2' 
            onClick={() => filter('All genres')}
          >
            All genres
          </Button>
          {genres.map((g, index) => (
            <Button 
              type='button'
              variant={genre === g ? 'outline-secondary' : 'primary'} 
              key={index} 
              className='me-2'
              onClick={() => filter(g)}
            >
              {g}
            </Button>
          ))}
        </div>
      </div>

      <Table striped bordered hover>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default Books
