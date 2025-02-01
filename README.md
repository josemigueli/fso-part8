# Full Stack Open - Part 8: GraphQL and React

This project is part of the [Full Stack Open](https://fullstackopen.com/en/) course offered by the University of Helsinki. It is a full-stack application built using **GraphQL** for the backend and **React** for the frontend. The application serves as a library management system, allowing users to manage books, authors, and user accounts.

## Features

### Backend (GraphQL Server)
- **GraphQL API**: Built using Apollo Server, providing a flexible and efficient API for querying and mutating data.
- **MongoDB Integration**: Uses Mongoose to interact with a MongoDB database, storing data for books, authors, and users.
- **Authentication**: Implements JWT-based authentication for secure user login and access control.
- **Subscriptions**: Supports real-time updates using GraphQL subscriptions to notify clients when a new book is added.
- **Error Handling**: Includes robust error handling for user input validation and database operations.

### Frontend (React)
- **Apollo Client**: Manages GraphQL queries, mutations, and subscriptions, providing a seamless connection to the backend.
- **Routing**: Uses React Router for navigation between different views (e.g., authors, books, recommendations).
- **State Management**: Utilizes React context for managing user authentication and login state.
- **Real-Time Updates**: Subscribes to the backend to receive real-time notifications when a new book is added.
- **Bootstrap**: Styled using Bootstrap for a clean and responsive user interface.

## Technologies Used

### Backend
- **Node.js**: Runtime environment for the server.
- **Apollo Server**: GraphQL server implementation.
- **MongoDB**: NoSQL database for storing application data.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
- **JSON Web Tokens (JWT)**: For user authentication and authorization.
- **GraphQL Subscriptions**: Enables real-time updates using WebSockets.

### Frontend
- **React**: JavaScript library for building the user interface.
- **Apollo Client**: Manages GraphQL operations on the client side.
- **React Router**: Handles client-side routing.
- **Bootstrap**: CSS framework for styling and responsive design.
- **WebSocket**: For real-time communication with the backend.
- **Vite**: Build tool for fast development and optimized production builds.

## Getting Started

### Prerequisites
- **Node.js**: Ensure you have Node.js installed on your machine.
- **MongoDB**: Set up a MongoDB database (local or cloud-based) and obtain the connection URI.
- **Environment Variables**: Create a `.env` file in the `graphql-server` directory with the following variables:
  ```plaintext
  MONGODB_URI=<your-mongodb-uri>
  JWT_SECRET=<your-jwt-secret>
  PORT=4000
  ```

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/josemigueli/fso-part8.git
   cd fso-part8
   ```

2. Install dependencies for both the backend and frontend:
   ```bash
   cd graphql-server
   npm install
   cd ../library-frontend
   npm install
   ```

3. Start the backend server:
   ```bash
   cd ../graphql-server
   npm run dev
   ```

4. Start the frontend application:
   ```bash
   cd ../library-frontend
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to access the application.

## Usage

### Backend
- The GraphQL server runs on `http://localhost:4000`.
- You can use tools like [GraphQL Playground](https://www.graphql-playground.io/) or [Apollo Studio](https://studio.apollographql.com/) to interact with the API.

### Frontend
- The React application runs on `http://localhost:3000`.
- Use the navigation bar to access different sections of the application (you need to be logged in to use the application):
  - **Authors**: View a list of authors and update their birth years.
  - **Books**: Browse books, filter by genre, and view details.
  - **Add Book**: Add a new book to the library.
  - **Recommendations**: Get personalized book recommendations based on your favorite genre.

## License
This project is licensed under the MIT License.

---

This project was developed as part of the Full Stack Open course by the University of Helsinki.