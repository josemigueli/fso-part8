/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import SetBirthday from './SetBirthdat'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import { useLoginValue } from '../LoginContext'

const Authors = ({ setNoty }) => {
  const token = useLoginValue()
  const navigate = useNavigate()
  const result = useQuery(ALL_AUTHORS)

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  })

  if (result.loading) {
    return <Container><p>Loading...</p></Container>
  }

  if (!token) {
    return null
  }

  return (
    <Container>
      <h2>Authors</h2>
      <Table striped bordered hover>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Born</th>
            <th>Books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <SetBirthday authors={result.data.allAuthors} setNoty={setNoty}/>
    </Container>
  )
}

export default Authors
