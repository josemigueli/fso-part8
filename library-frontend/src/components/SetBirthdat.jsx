import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { SET_BIRTHDAY, ALL_AUTHORS } from '../queries'
import Select from 'react-select'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const SetBirthday = ({ authors, setNoty }) => {
  const [born, setBorn] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [addBirthday] = useMutation(SET_BIRTHDAY, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onCompleted: () => {
      handleClose()
      setBorn('')
      const message = 'Author updated!'
      setNoty({ message })
    },
    onError: (error) => {
      handleClose()
      const message = error.graphQLErrors.map((e) => e.message).join('\n')
      setNoty({ message, type: 'error' })
    }
  })
  const submit = async (event) => {
    event.preventDefault()
    addBirthday({
      variables: { name: selectedOption.value, setBornTo: parseInt(born) }
    })
  }

  const options = authors.map((a) => ({ value: a.name, label: a.name }))

  return (
    <div>
      <Button variant='dark' type='button' onClick={handleShow}>
        Set Birthday
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <div className='p-4'>
            <div className='mb-5'>
              <h2 className='fw-bold'>Set Birthday</h2>
              <p className='fw-light'>
                Set or change the birthday of the authors
              </p>
            </div>

            <Form onSubmit={submit}>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='name'>Name</Form.Label>
                <Select
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  isClearable
                  options={options}
                  id='name'
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='born'>Born</Form.Label>
                <Form.Control
                  type='text'
                  id='born'
                  value={born}
                  onChange={({ target }) => setBorn(target.value)}
                />
              </Form.Group>
              <Button type='submit' variant='dark' className='w-100 mb-2'>
                Update Author
              </Button>
              <Button
                type='button'
                variant='light'
                className='w-100'
                onClick={handleClose}>
                Close
              </Button>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default SetBirthday
