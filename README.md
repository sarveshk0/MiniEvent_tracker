# Mini Event Tracker

A robust, full-stack event management application built with **NestJS**, **Next.js**, **Prisma**, and **PostgreSQL**.

## 🚀 Features

- **Standardized API**: Robust backend with versioning (`/api/v1/`), global logging, and unified response formats.
- **Secure Authentication**: JWT-based authentication with HTTP-only cookies and refresh token rotation.
- **Advanced Event Management**: Create, update, and track events with optimized filtering (Upcoming/Past).
- **Public Sharing**: Generate secure public share links for events.
- **Modern UI/UX**: Premium dashboard with mobile-first design, skeleton loading states, and toast notifications.
- **Responsive Design**: Unified experience across all screen sizes.

---

## 🛠️ Tech Stack

### Backend (NestJS)
- **Prisma ORM**: Type-safe database access.
- **PostgreSQL**: Reliable relational data storage.
- **Passport.js**: Secure authentication strategies.
- **Swagger**: Comprehensive API documentation.
- **Class-Transformer**: Secure DTO serialization to prevent sensitive data exposure.

### Frontend (Next.js)
- **TailwindCSS**: Premium, utility-first styling.
- **React Hook Form & Zod**: Robust form validation.
- **Context API**: Global state management for authentication.
- **Axios**: Standardized API client with interceptors for auth handling.
- **Lucide React**: Beautiful icons.

---

## 📁 Architecture Explanation

The project follows a **Modular Architecture** on the backend and a **Feature-Based Structure** on the frontend.

### Backend Structure
- **Controller-Service-Repository Pattern**: Ensures clear separation of concerns.
- **Core Modules**: `Auth`, `Users`, and `Events` are isolated modules.
- **Infrastructure**: Global Filters and Interceptors manage cross-cutting concerns (Error handling, Response normalization).

### Frontend Structure
- **App Router**: Leveraging Next.js 13+ conventions.
- **Contextual State**: `AuthContext` manages user sessions globally and handles route protection.
- **Reusable UI**: Atomic component design with Tailwind merging utilities.

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18+)
- PostgreSQL (or Supabase URL)

### Environment Variables
Create a `.env` file in the `backend` directory:
```env
DATABASE_URL="your_postgresql_url"
JWT_SECRET="your_access_token_secret"
JWT_REFRESH_SECRET="your_refresh_token_secret"
FRONTEND_URL="http://localhost:3000"
PORT=8080
```

### Installation
1. **Clone the repo**
2. **Setup Backend**:
   ```bash
   cd backend
   npm install
   npx prisma db push
   npm run start:dev
   ```
3. **Setup Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

---

## 🔒 Security Considerations
- **Password Hashing**: Bcrypt is used with 10 salt rounds.
- **Data Isolation**: Users can only see and modify their own events (Ownership verification).
- **HTTP-only Cookies**: Access and Refresh tokens are stored securely to prevent XSS attacks.
- **Serialization**: Sensitive fields like `passwordHash` and `refreshTokens` are explicitly excluded from API responses.

---

## 🛠️ Tech Stack
... (previously documented)

---

## 📡 API Reference

All requests follow the structure: `{ success: boolean, message: string, data: any }`

### Authentication
- `POST /api/v1/auth/register` - Create a new user.
- `POST /api/v1/auth/login` - Authenticate and get tokens.
- `POST /api/v1/auth/refresh` - Rotate refresh tokens.

### Events
- `GET /api/v1/events` - List user events (Query params: `type=upcoming|past`, `page`, `limit`).
- `POST /api/v1/events` - Create a new event.
- `GET /api/v1/events/:id` - Get event details.
- `GET /api/v1/events/share/:token` - Public access to event data.

---

## 🩹 Troubleshooting

- **CORS Errors**: Ensure `FRONTEND_URL` in backend `.env` matches your frontend origin exactly.
- **Database Connection**: Verify PostgreSQL is running and the `DATABASE_URL` is accessible.
- **Token Expiry**: If logged out immediately, sync your system clock and check `JWT_SECRET` consistency.

---

## 🚀 Deployment Steps
1. **Backend**: Deploy to **Render** or **Vercel** with PostgreSQL (Supabase/Neon).
2. **Database**: Run `npx prisma db push` against the production DB.
3. **Frontend**: Deploy to **Vercel** with the appropriate environment variables.


---

## 📝 Trade-offs and Assumptions
- **Simplicity vs Scalability**: Chose the Repository pattern early to support future scalability despite the small initial scope.
- **Session Management**: Single sessions are prioritized for simplicity, though the schema supports multiple refresh tokens.

---

**Built with ❤️ for Event Organizers.**
