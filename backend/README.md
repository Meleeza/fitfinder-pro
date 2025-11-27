# FitFinder Pro Backend

Backend API for FitFinder Pro application with user authentication.

## Features

- User registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Token refresh mechanism
- MongoDB database integration
- Input validation with Zod

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update environment variables:
   - `MONGODB_URI` - Already configured with the provided MongoDB connection
   - `JWT_SECRET` - Generate a secure random string (64+ characters)
   - `JWT_REFRESH_SECRET` - Generate a different secure random string

4. Run development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user info (requires auth)

## Project Structure

```
backend/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Express middleware
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── types/          # TypeScript types
│   ├── utils/          # Utility functions
│   └── server.ts       # Entry point
├── .env.example
├── package.json
└── tsconfig.json
```

## Technologies

- Node.js
- Express.js
- TypeScript
- MongoDB with Mongoose
- JWT
- Bcrypt
- Zod
