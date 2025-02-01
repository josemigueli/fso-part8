import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK, BOOKS_BY_GENRE } from '../queries'
import Container from 'react-bootstrap/esm/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'
import { useLoginValue } from '../LoginContext'
import { updateCache } from '../functions'

const NewBook = ({ setNoty }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const token = useLoginValue()
  const navigate = useNavigate()
  const [render, setRender] = useState(true)

  const [addBook] = useMutation(CREATE_BOOK, {
    onCompleted: () => {
      setTitle('')
      setPublished('')
      setAuthor('')
      setGenres([])
      setGenre('')
      const message = 'Book added!'
      setNoty({ message })
    },
    onError: (error) => {
      console.log(error)
      const message = error.graphQLErrors.map((e) => e.message).join('\n')
      setNoty({ message, type: 'error' })
    },
    update: (cache, { data }) => {
      updateCache(cache, ALL_BOOKS, BOOKS_BY_GENRE, ALL_AUTHORS, data.addBook)
    }
  })

  const submit = async (event) => {
    event.preventDefault()
    addBook({
      variables: { title, author, published: parseInt(published), genres }
    })
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
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

  if (!token) {
    return null
  }

  return (
    <Container className='mb-5 mt-3 d-flex justify-content-center'>
      <div className='col-lg-7 border border-secondary-subtle rounded-3 p-4'>
        <div className='mb-5'>
          <h2 className='fw-bold'>Add a Book</h2>
          <p className='fw-light'>
            Enter the details of the book you want to add to the library
          </p>
        </div>
        <Form onSubmit={submit}>
          <Form.Group className='mb-3'>
            <Form.Label className='fw-bold'>Title</Form.Label>
            <Form.Control
              placeholder='Enter the book title'
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label className='fw-bold'>Author</Form.Label>
            <Form.Control
              placeholder='Enter author name'
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label className='fw-bold'>Published</Form.Label>
            <Form.Control
              placeholder='Enter a date'
              type='number'
              value={published}
              onChange={({ target }) => setPublished(target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label className='fw-bold'>Genres</Form.Label>
            <div className='d-flex gap-2'>
              <Form.Control
                placeholder='Enter one genre'
                value={genre}
                onChange={({ target }) => setGenre(target.value)}
              />
              <Button
                onClick={addGenre}
                type='button'
                variant='light'
                className='fw-bold'>
                +
              </Button>
            </div>
          </Form.Group>
          <div className='mb-3'>
            {' '}
            <span className='fw-bold'>Genres:</span> {genres.join(' ')}
          </div>
          <Button type='submit' variant='dark' className='w-100'>
            Create Book
          </Button>
        </Form>
      </div>
    </Container>
  )
}

export default NewBook
