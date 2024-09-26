import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { SET_BIRTHDAY, ALL_AUTHORS } from '../queries'
import Select from 'react-select'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const SetBirthday = ({ authors, setNoty }) => {
  const [born, setBorn] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)
  const [addBirthday] = useMutation(SET_BIRTHDAY, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onCompleted: () => {
      setBorn('')
      const message = 'Author updated!'
      setNoty({ message })
    },
    onError: (error) => {
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
    <div className='mb-5 col-lg-5'>
      <h2>Set Birthday</h2>
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
        <Button type='submit' variant='primary'>
          Update Author
        </Button>
      </Form>
    </div>
  )
}

export default SetBirthday
