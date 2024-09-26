import { createContext, useReducer, useContext } from 'react'
import { useApolloClient } from '@apollo/client'

const loginReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      window.localStorage.setItem('library-user-token', action.payload)
      return action.payload
    case 'LOGOUT':
      window.localStorage.removeItem('library-user-token')
      return null
    case 'RETRIEVE':
      return window.localStorage.getItem('library-user-token')
    default:
      return state
  }
}

const LoginContext = createContext()

export const LoginContextProvider = (props) => {
  const [login, loginDispatch] = useReducer(loginReducer, null)
  return (
    <LoginContext.Provider value={[login, loginDispatch]}>
      {props.children}
    </LoginContext.Provider>
  )
}

export const useLoginValue = () => {
  const loginAndDispatch = useContext(LoginContext)
  return loginAndDispatch[0]
}

export const useLogin = () => {
  const loginAndDispatch = useContext(LoginContext)
  const dispatch = loginAndDispatch[1]
  return (payload) => {
    dispatch({ type: 'LOGIN', payload })
  }
}

export const useTokenRetrieve = () => {
  const loginAndDispatch = useContext(LoginContext)
  const dispatch = loginAndDispatch[1]
  return () => {
    dispatch({ type: 'RETRIEVE' })
  }
}

export const useLogout = () => {
  const client = useApolloClient()
  const loginAndDispatch = useContext(LoginContext)
  const dispatch = loginAndDispatch[1]
  return () => {
    client.resetStore()
    dispatch({ type: 'LOGOUT' })
  }
}

export default LoginContext
