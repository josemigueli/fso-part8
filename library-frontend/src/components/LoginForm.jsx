/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import Container from 'react-bootstrap/esm/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { LOGIN } from '../queries'
import { useLogin, useLoginValue } from '../LoginContext'


const LoginForm = ({ setNoty }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const loginUser = useLogin()
    const token = useLoginValue()
    const navigate = useNavigate()
    const [login, result] = useMutation(LOGIN, {
        onCompleted: () => {
            setUsername('')
            setPassword('')
        },
        onError: (error) => {
            const message = error.graphQLErrors[0].message
            setNoty({ message, type: 'error' })
        }
    })

    const submit = async (event) => {
        event.preventDefault()
        login({ variables: { username, password } })
    }

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            loginUser(token)
        }
    }, [result.data])

    useEffect(() => {
        if (token) {
            navigate('/')
        }
    })

    if (token) {
        return null
    }

    return (
        <Container className='my-5'>
            <div className='justify-content-center row'>
                <div className='col-lg-5'>
                    <h2>Login</h2>
                    <Form onSubmit={submit}>
                        <Form.Group className='mb-3'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type='text'
                                value={username}
                                onChange={({ target }) => setUsername(target.value)}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                value={password}
                                onChange={({ target }) => setPassword(target.value)}
                            />
                        </Form.Group>
                        <Button type='submit'>Login</Button>
                    </Form>
                </div>
            </div>
            
        </Container>
    )
}

export default LoginForm