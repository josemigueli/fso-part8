import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED, BOOKS_BY_GENRE, ALL_AUTHORS } from './queries'
import { updateCache } from './functions'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Header from './components/Header'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import { useTokenRetrieve } from './LoginContext'

const App = () => {
  const [notification, setNotification] = useState(null)
  const retrieve = useTokenRetrieve()

  const notify = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      notify({ message: `${addedBook.title} added` })
      updateCache(
        client.cache,
        ALL_BOOKS,
        BOOKS_BY_GENRE,
        ALL_AUTHORS,
        addedBook
      )
    }
  })

  useEffect(() => {
    retrieve()
  }, [])

  return (
    <Container>
      <Notification noty={notification} />
      <Header />
      <Routes>
        <Route path='/' element={<Authors setNoty={notify} />} />
        <Route path='/books' element={<Books />} />
        <Route path='/recommendations' element={<Recommendations />} />
        <Route path='/new-book' element={<NewBook setNoty={notify} />} />
        <Route path='/login' element={<LoginForm setNoty={notify} />} />
      </Routes>
    </Container>
  )
}

export default App
