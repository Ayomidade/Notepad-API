## NoteFlow API

A RESTful API for a notes application that provides user authentication and full CRUD functionality for managing personal notes.
Each user can securely create, read, update, delete, and search their own notes.

### 🚀 Features

- User registration and login

- JWT-based authentication

- Protected routes

- Create, read, update, and delete notes

- User-specific data access

- Secure password hashing

### 🛠 Tech Stack

- Node.js

- Express.js

- MongoDB

- JSON Web Tokens (JWT)

- bcrypt

📁

### 🔐 Authentication

- Authentication is handled using JWT.

- Token is issued on successful login

- Token must be sent in the Authorization header for protected routes

- Authorization: Bearer <token>

### 📌 API Endpoints

Auth Routes

Method Endpoint Description

- POST /api/new-user Register a new user
- POST /api/login Login user

Notes Routes (Protected)

Method Endpoint Description

- POST /api/notes Create a note
- GET /api/notes Get all user notes
- GET /api/notes/:id Get a single note
- PATCH /api/notes/:id Update a note
- DELETE /api/notes/:id Delete a note
- GET /api/user Get current User

### ⚙️ Environment Variables

Create a .env file in the root directory:

- PORT=5050
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_secret_key

### ▶️ Running the Server

- Install dependencies:
  npm install

- Start the development server:
  npm run dev

### 🧠 Design Considerations

- Routes follow REST conventions

- Middleware is used to protect private routes

- Controllers handle business logic

- Models define database schema and validation

- Each note is linked to its owner

### 📄 License

MIT License

---
