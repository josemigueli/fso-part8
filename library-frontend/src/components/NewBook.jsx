/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK } from '../queries'
import Container from 'react-bootstrap/esm/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'

const NewBook = ({ setNoty }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ addBook ] = useMutation(CREATE_BOOK, {
    refetchQueries: [ { query: ALL_AUTHORS }, { query: ALL_BOOKS } ],
    onCompleted: () => {
      setTitle('')
      setPublished('')
      setAuthor('')
      setGenres([])
      setGenre('')
      const message = 'Book added!'
      setNoty( {message} )
    },
    onError: (error) => {
      const message = error.graphQLErrors.map(e => e.message).join('\n')
      setNoty( {message, type: 'error'} )
    }
  })

  const submit = async (event) => {
    event.preventDefault()
    addBook({ variables: { title, author, published: parseInt(published), genres } })
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <Container>
      <div className='col-lg-5'>
        <h2>Add a Book</h2>
        <Form onSubmit={submit}>
          <Form.Group className='mb-3'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Author</Form.Label>
            <Form.Control
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Published</Form.Label>
            <Form.Control
              type="number"
              value={published}
              onChange={({ target }) => setPublished(target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Genre</Form.Label>
            <Form.Control
              value={genre}
              onChange={({ target }) => setGenre(target.value)}
              className='mb-3'
            />
            <Button onClick={addGenre} type='button' variant='secondary'>
              Add Genre
            </Button>
          </Form.Group>
          <div className='mb-3'>Genres: {genres.join(' ')}</div>
          <Button type='submit' variant='primary'>Create Book</Button>
        </Form>
      </div>
    </Container>
  )
}

export default NewBook