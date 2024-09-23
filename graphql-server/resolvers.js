const { v4: uuidv4 } = require('uuid')
const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const pubsub = new PubSub()

const resolvers = {
    Query: {
        booksCount: async () => Book.collection.countDocuments(),
        authorsCount: async () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            if (!args.author && !args.genre) {
                return await Book.find({}).populate('author')
            }
            if (args.author && args.genre) {
                const author = await Author.findOne({ name: args.author })
                if (!author) {
                    return []
                }
                const theBooks = await Book.find({ author: author._id }).populate('author')
                const byGenres = theBooks.filter(b => b.genres.includes(args.genre))
                return byGenres
            }
            if (args.author && !args.genre) {
                const author = await Author.findOne({ name: args.author })
                if (!author) {
                    return []
                }
                const theBooks = await Book.find({ author: author._id }).populate('author')
                return theBooks
            }
            if (!args.author && args.genre) {
                const byGenres = await Book.find({ genres: args.genre }).populate('author')
                return byGenres
            }
        },
        allAuthors: async () => Author.find({}),
        me: (root, args, context) => {
            return context.currentUser
        }
    },
    Author: {
      name: (root) => root.name,
      id: (root) => root.id,
      born: (root) => root.born,
      bookCount: async (root) => {
        const getBooks = await Book.find({ author: root.id })
        return getBooks.length
      }
    },
    Mutation: {
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new GraphQLError('Not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                })
            }
  
            if (args.author.length < 4) {
                throw new GraphQLError('Author name is shorter than the minimum allowed length (4)', {
                    extensions: {
                    code: 'BAD_USER_INPUT',
                    invalidArgs: args.author,
                    }
                })
            }
  
            if (args.title.length < 5) {
                throw new GraphQLError('Book name is shorter than the minimum allowed length (5)', {
                    extensions: {
                    code: 'BAD_USER_INPUT',
                    invalidArgs: args.title,
                    }
                })
            }
  
            const checkBookName = await Book.findOne({ title: args.title })
            if (checkBookName) {
                throw new GraphQLError('Book name must be unique and this already exists', {
                    extensions: {
                    code: 'BAD_USER_INPUT',
                    invalidArgs: args.title
                    }
                })
            }
  
            const checkAuthor = await Author.findOne({ name: args.author })
            let theAuthor
  
            if (!checkAuthor) {
                const author = new Author({ name: args.author, id: uuidv4() })
                try {
                    await author.save()
                    theAuthor = author
                } catch (error) {
                    throw new GraphQLError('Saving new author failed.', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.author,
                        error
                    }
                    })
                }
            } else {
                theAuthor = checkAuthor
            }
  
            const book = new Book({ ...args, author: theAuthor, id: uuidv4() })
            try {
                await book.save()
            } catch (error) {
                throw new GraphQLError('Saving new book failed', {
                    extensions: {
                    code: 'BAD_USER_INPUT',
                    error
                    }
                })
            }

            pubsub.publish('BOOK_ADDED', { bookAdded: book })
  
            return book
        },
        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new GraphQLError('Not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                })
            }
  
            const author = await Author.findOne({ name: args.name })
            if (!author) {
                return null
            }
            author.born = args.setBornTo
            try {
                await author.save()
            } catch (error) {
                throw new GraphQLError('Updating author failed', {
                    extensions: {
                    code: 'BAD_USER_INPUT',
                    invalidArgs: args.setBornTo,
                    error
                    }
                })
            }
            return author
        },
        createUser: async (root, args) => {
            if (args.username.length < 3) {
                throw new GraphQLError('Username is shorter than the minimum allowed length (3)', {
                    extensions: {
                    code: 'BAD_USER_INPUT',
                    invalidArgs: args.username
                    }
                })
            }
            const checkUser = await User.findOne({ username: args.username })
            if (checkUser) {
                throw new GraphQLError('Username already exists', {
                    extensions: {
                    code: 'BAD_USER_INPUT',
                    invalidArgs: args.username
                    }
                })
            }
  
            const user = new User({ ...args, id: uuidv4() })
            try {
                await user.save()
            } catch (error) {
                throw new GraphQLError('Creating user failed', {
                    extensions: {
                    code: 'BAD_USER_INPUT',
                    error
                    }
                })
            }
            return user
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })
            if (!user || args.password !== 'secret') {
            throw new GraphQLError('Wrong credentials', {
                extensions: {
                    code: 'BAD_USER_INPUT'
                }
            })
            }
            const userForToken = {
                username: user.username,
                id: user._id
            }
            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
        }
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        }
    }
}

module.exports = resolvers