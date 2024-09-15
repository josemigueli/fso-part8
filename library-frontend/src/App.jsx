/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Header from './components/Header'
import Notification from './components/Notification'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'

const App = () => {
  const [notification, setNotification] = useState(null)

  const notify = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  return (
    <Container>
      <Notification noty={notification} />
      <Header />
      <Routes>
        <Route path='/' element={ <Authors setNoty={notify} /> } />
        <Route path='/books' element={ <Books /> } />
        <Route path='/new-book' element={ <NewBook setNoty={notify} /> } />
      </Routes>
    </Container>
  )
}

export default App
