import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
    allAuthors {
        name
        born
        bookCount
        id
    }
}
`
export const ALL_BOOKS = gql`
query {
  allBooks {
    id
    title
    published
    genres
    author {
      name
    }
  }
}
`

export const CREATE_BOOK = gql`
mutation($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
  addBook(title: $title, published: $published, author: $author, genres: $genres) {
    title
    author {
      name
    }
    published
    genres
  }
}
`

export const SET_BIRTHDAY = gql`
mutation($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    bookCount
    born
    name
    id
  }
}
`

export const LOGIN = gql`
mutation($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`

export const ME = gql`
query {
  me {
    id
    username
    favoriteGenre
  }
}
`

export const BOOKS_BY_GENRE = gql`
query($genre: String) {
  allBooks(genre: $genre) {
    id
    title
    published
    genres
    author {
      name
    }
  }
}
`