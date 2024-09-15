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
    author
    published
  }
}
`

export const CREATE_BOOK = gql`
mutation($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
  addBook(title: $title, published: $published, author: $author, genres: $genres) {
    title
    author
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