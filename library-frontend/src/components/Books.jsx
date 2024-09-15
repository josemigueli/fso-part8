import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import Container from 'react-bootstrap/esm/Container'
import Table from 'react-bootstrap/esm/Table'


const Books = () => {
  const result = useQuery(ALL_BOOKS)

  if (result.loading) {
    return <Container><p>Loading...</p></Container>
  }

  return (
    <Container>
      <h2>Books</h2>

      <Table striped bordered hover>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {result.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default Books
