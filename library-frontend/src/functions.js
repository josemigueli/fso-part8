export const updateCache = (cache, queryAll, queryByGenre, queryAuthors, addedBook) => {
    const uniqByName = (a) => {
      let seen = new Set()
      return a.filter((item) => {
        let k = item.title
        return seen.has(k) ? false : seen.add(k)
      })
    }

    const updateAuthors = (authors, book) => {
      const checkAuthor = authors.filter(a => a.name.includes(book.author.name))
      if (checkAuthor.length < 1) {
        return authors.concat(book.author)
      }
      const updateAuthorCount = { ...checkAuthor, bookCount: checkAuthor.bookCount + 1 }
      return authors.map( a => a.name === updateAuthorCount.name ? updateAuthorCount : a)
    }

    cache.updateQuery({ query: queryAuthors }, (allAuthors) => {
      const data = allAuthors?.allAuthors
      if (!data) {
        return
      }
      return {
        allAuthors: updateAuthors(data, addedBook)
      }
    })
  
    cache.updateQuery({ query: queryAll }, (allBooks) => {
      const data = allBooks?.allBooks
      if (!data) {
        return
      }
      return {
        allBooks: uniqByName(data.concat(addedBook))
      }
    })

    addedBook.genres.map(g => {
      cache.updateQuery({ query: queryByGenre, variables: { genre: g } }, (allBooks) => {
        const data = allBooks?.allBooks
        if (!data) {
          return
        }
        return {
          allBooks: uniqByName(data.concat(addedBook))
        }
      })
    })
}