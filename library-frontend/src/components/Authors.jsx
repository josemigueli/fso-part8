/* eslint-disable react/prop-types */
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import SetBirthday from './SetBirthdat'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'

const Authors = ({ setNoty }) => {
  const result = useQuery(ALL_AUTHORS)

  if (result.loading) {
    return <Container><p>Loading...</p></Container>
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
