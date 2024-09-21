import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { LoginContextProvider } from './LoginContext.jsx'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('library-user-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null
    }
  }
})

const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
})

const client = new ApolloClient({
  cache: new InMemoryCache,
  link: authLink.concat(httpLink)
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <ApolloProvider client={client}>
      <LoginContextProvider>
        <App />
      </LoginContextProvider>
    </ApolloProvider>
  </Router>
)
