# PulseBoard

PulseBoard is a full-stack MERN analytics dashboard for managing user-specific project work. It includes a protected dashboard, project CRUD, authentication, and a glassmorphism-inspired UI.

## Stack

- Frontend: React + Vite + Tailwind-inspired CSS
- Backend: Node.js + Express
- Database: MongoDB Atlas or local MongoDB
- Auth: JWT in an HTTP-only cookie

## Prerequisites

- Node.js 18+
- MongoDB running locally or a MongoDB Atlas connection string
- A Gmail/SMTP account for password-reset emails (optional for basic auth flows)

## Environment setup

1. Copy the example environment files:
   - `server/.env.example` to `server/.env`
   - `client/.env.example` to `client/.env`
2. Update the values with your local configuration.

## Backend setup

```bash
cd server
npm install
npm run dev
```

## Frontend setup

```bash
cd client
npm install
npm run dev
```

## Default local URLs

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## MongoDB

Set your connection string in the server environment file:

```env
MONGO_URI=mongodb://127.0.0.1:27017/pulseboard
```

## JWT and email configuration

```env
JWT_SECRET=replace_with_a_long_random_secret
PORT=5000
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

## Architecture notes

- The API authenticates requests with a JWT stored in an HTTP-only cookie to reduce XSS exposure and keep the token out of client-side JavaScript storage.
- Dashboard metrics are computed using MongoDB aggregation inside the server service layer so the app does not fetch then calculate on the client.
- Project data is scoped by the authenticated user via `owner` references on each document.

## Useful scripts

- Server: `npm run dev`
- Client: `npm run dev`
- Client production build: `npm run build`
