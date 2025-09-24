# Backend API

This is the backend server for the Fitness Plan & Recipe Website, built with Node.js, Express, and SQLite.

## Features

- User registration and authentication
- JWT-based authentication
- SQLite database for user storage
- CORS enabled for frontend communication

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. For production:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication

- **POST /api/auth/register**
  - Register a new user
  - Body: `{ "username": "string", "email": "string", "password": "string" }`

- **POST /api/auth/login**
  - Login user
  - Body: `{ "username": "string", "password": "string" }`
  - Returns: `{ "token": "jwt_token", "user": { "id": "number", "username": "string", "email": "string" } }`

- **GET /api/auth/profile**
  - Get user profile (protected route)
  - Headers: `Authorization: Bearer <token>`

## Environment Variables

Create a `.env` file in the backend directory:

```
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

## Database

The application uses SQLite with a `users.db` file created automatically on first run.

## Development

The server runs on `http://localhost:5000` by default. Use nodemon for auto-restart during development.
