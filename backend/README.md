

**Backend Features**
======================

### Overview

This backend application provides a set of APIs for managing agents, chats, and users. It uses a MongoDB database for storing data and Node.js with Express.js as the server-side framework.

### Features

* **Agent Management**: Create, read, update, and delete (CRUD) agents
* **Chat Management**: Create, read, update, and delete (CRUD) chats
* **User Management**: Create, read, update, and delete (CRUD) users
* **Authentication**: Authenticate users using JSON Web Tokens (JWT)
* **Authorization**: Authorize users to access specific APIs based on their roles

### Running Locally

To run the backend application locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your-repo/backend.git`
2. Install dependencies: `npm install`
3. Start the application: `npm start`
4. Access the application: `http://localhost:5000`

### APIs

#### Agent APIs

* **Create Agent**: `POST /api/agent` - Create a new agent
* **Get All Agents**: `GET /api/agent` - Retrieve a list of all agents
* **Get Agent by ID**: `GET /api/agent/:id` - Retrieve an agent by ID
* **Update Agent**: `PUT /api/agent/:id` - Update an existing agent
* **Delete Agent**: `DELETE /api/agent/:id` - Delete an agent

#### Chat APIs

* **Create Chat**: `POST /api/chat` - Create a new chat
* **Get All Chats**: `GET /api/chat` - Retrieve a list of all chats
* **Get Chat by ID**: `GET /api/chat/:id` - Retrieve a chat by ID
* **Update Chat**: `PUT /api/chat/:id` - Update an existing chat
* **Delete Chat**: `DELETE /api/chat/:id` - Delete a chat

#### User APIs

* **Create User**: `POST /api/user` - Create a new user
* **Get All Users**: `GET /api/user` - Retrieve a list of all users
* **Get User by ID**: `GET /api/user/:id` - Retrieve a user by ID
* **Update User**: `PUT /api/user/:id` - Update an existing user
* **Delete User**: `DELETE /api/user/:id` - Delete a user

#### Authentication APIs

* **Login**: `POST /api/auth/login` - Authenticate a user and retrieve a JWT token
* **Register**: `POST /api/auth/register` - Create a new user and retrieve a JWT token

### Environment Variables

The following environment variables are required:

* `MONGO_URI`: The MongoDB connection string
* `JWT_SECRET`: The secret key for signing JWT tokens
* `PORT`: The port number for the application to listen on