# Productify - A PERN Application

A full-stack interactive product store build with PostgreSQL, Express, React, and Node.js. This project was used for hands-on learning experience to better understand full-stack development, deployment strategies, and various development tools. Original project credit outlined below.

![App Preview](/frontend/public/productify-preview.png)

## ✔︎ Features

- **CRUD Operations** - Create, Read, Update, and Delete products
- **User Authentication** - Secure authentication with Clerk
- **Responsive Design** - Mobile-first UI with Tailwind CSS and DaisyUI
- **Themes** - Persistent themes with React Context
- **Error Handling** - Express 5 error middleware
- **Type-Safe Backend** - TypeScript with Drizzle ORM
- **Optimistic Updates** - Instant UI feedback with TanStack Query
- **Production Deployment** - Separate frontend/backend deployment on Vercel

## 🛠️ Tech Stack

### Backend Technologies

- Node.js
- Express 5
- TypeScript
- PostgreSQL (hosted on Neon)
- Drizzle ORM
- Clerk

### Frontend Technologies

- React
- Vite
- TypeScript
- React Router
- TanStack Query
- Axios
- Tailwind CSS
- DaisyUI

## 🚀 Getting Started

### Prerequisites

- Node.js (recommend >=20.0.0)
- Neon account for PostgreSQL database
- Clerk account for authentication

### Environmental Variables

#### `/backend/.env`

```env
PORT=8000
NODE_ENV=development

# Database (Neon or local PostgreSQL)
DATABASE_URL=postgresql://username:password@host/database

# Clerk Authentication
CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

#### `/frontend/.env`

```env
# Clerk Authentication (.env)
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx

# Backend Connection (.env.development)
VITE_API_URL=http://localhost
VITE_API_PORT=8000

# Backend Connection (.env.production)
VITE_APP_NAME=
```

> **Note**: The frontend uses different .env files for development and production. Vite automatically loads the correct file based on the mode.

## 💻 Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/lebuckman/product-store.git
cd product-store
```

### 2. Setup Backend

```bash
cd backend
npm install

# Create .env file (see example above)

# Push database schema to PostgreSQL
npm run db:push

# Start development server
npm run dev
```

### 3. Setup Frontend

```bash
cd frontend
npm install

# Create .env files (see example above)

# Start development server
npm run dev
```

## 📂 Project Structure

```plaintext
product-store/
├── backend/
│   ├── api/
│   │   └── index.ts              # Express app (Vercel serverless)
│   ├── src/
│   │   ├── config/
│   │   │   └── env.ts            # dotenv config
│   │   ├── db/
│   │   │   ├── index.ts          # Database connection
│   │   │   ├── queries.ts        # Query database
│   │   │   └── schema.ts         # Drizzle database schema
│   │   ├── routes/               # API routes
│   │   ├── controllers/          # Route controllers
│   │   ├── errors/
│   │   │   └── httpErrors.ts     # Custom Error classes
│   │   └── middleware/
│   │       └── errorHandler.ts   # Error middleware
│   ├── drizzle.config.ts         # Drizzle configs
│   ├── nodemon.json              # Nodemon configs
│   ├── package.json
│   ├── tsconfig.json
│   ├── vercel.json               # Vercel configs
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── lib/                  # Axios, API calls, helpers
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx              # App entry point
│   ├── public/                   # Static assets
│   ├── package.json
│   ├── vite.config.ts
│   ├── vercel.json               # Vercel configuration
│   ├── .env                      # Shared env vars
│   ├── .env.development          # Development env vars
│   └── .env.production           # Production env vars
│
└── .gitignore                  
```

## 📚 Learning Notes

### Core Concepts

- **PERN Architecture** - Understanding how everything works together
- **Separation of Concerns** - Following a project structure with routes, controllers, and database layers
- **RESTful API Design** - Building scalable API endpoints
- **Database Relationships** - Modeling data with Drizzle ORM and PostgreSQL
- **Authentication Flow** - Integrating Clerk for secure user management

### Frontend

- **TanStack Query** - data fetching patterns, including `useQuery` and `useMutation` as well as cache invalidation for "optimistic updates"
- **React Context** - global state management
- **Client-Side Routing** - navigating with React Router

### Backend

- **Drizzle ORM** - defining a schema and creating type-safe queries
- **CORS Configs** - handling cross-origin requests for separate deployments
- **Environment-Based Configs** - contrast development vs production

### Project Improvements

- **Express 5 Error Handling** - implement async error middleware
- **Consistent Error Resposnes** - standardized error formatting across API
- **Theme Context** - custom React Context for user's chosen theme
- **Improved Styling** - adjust UI to be slightly more coherent and responsive
- **Vercel Deployment** - adjusting project to be deployed on Vercel (frontend and backend)
- **Environment Support** - implement dev/production enviroment setup

## ✨ Acknowledgements

- [PERN Stack Course video by Codesistency](https://youtu.be/y7kvxIQQxtQ?si=E5LnqxSZwainvCs9)
- [Vercel Deployment Guidance](https://www.youtube.com/watch?v=22Rywce_kcg)

## 🔗 Project Links

- **Live application**: <https://product-store-qanv.vercel.app/>
- **Backend API**: <https://product-store-theta-ten.vercel.app/api>
