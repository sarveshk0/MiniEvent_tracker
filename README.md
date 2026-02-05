# 📅 Mini Event Tracker

A high-performance, full-stack event management application featuring a **NestJS** backend and a **Next.js** frontend. Designed with premium aesthetics and robust architecture.

---

## 🌟 Key Features

- **Standardized API Layer**: Robust backend with versioning (`/api/v1/`), global logging, and unified response normalization.
- **Secure Authentication**: JWT-based auth with refresh token rotation and secure storage.
- **Advanced Event Management**: Full CRUD (Create, Read, Update, Delete) capability for events.
- **Public Event Sharing**: Generate and manage secure public links for external sharing.
- **Dynamic Dashboard**: Interactive dashboard with upcoming/past event filtering and real-time navigation.
- **Developer Convenience**: Included seed scripts and "Quick Fill" demo login options.

---

## 🛠️ Tech Stack

### Backend
- **Framework**: NestJS (Node.js)
- **Database**: PostgreSQL (managed via Prisma ORM)
- **Auth**: Passport.js + JWT
- **Documentation**: Swagger API UI
- **Validation**: Class-validator & Class-transformer

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS (Premium Dark/Indigo theme)
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Networking**: Axios with centralized API configuration

---

## 📁 Project Structure

```text
Mini Event Tracker/
├── backend/                # NestJS API
│   ├── prisma/             # Schema and Seed scripts
│   ├── src/                # Source code (Modules: Auth, Users, Events, Attendees)
│   └── .env                # Backend Configuration
├── frontend/               # Next.js Application
│   ├── src/app/            # Routes & Pages
│   ├── src/components/     # Reusable UI components
│   ├── src/context/        # Global Auth State
│   └── .env.local          # Frontend Configuration
└── README.md               # Main Documentation
```

---

## ⚙️ How to Set Up

### 1. Prerequisites
- **Node.js**: v18 or higher
- **Database**: A PostgreSQL instance (local or hosted, e.g., Supabase/Neon)

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables. Create a `.env` file in the `backend/` folder:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/event_tracker"

   # Auth
   JWT_SECRET="your-super-secret-access-key"
   JWT_EXPIRATION="15m"
   JWT_REFRESH_SECRET="your-super-secret-refresh-key"
   JWT_REFRESH_EXPIRATION="7d"

   # Server
   PORT=8080
   ```
4. Synchronize the database schema and generate the client:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
5. Seed the database with demo data:
   ```bash
   npx prisma db seed
   ```
6. Start the development server:
   ```bash
   npm run start:dev
   ```

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables. Create a `.env.local` file in the `frontend/` folder:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🔑 Demo Access

For testing without registration, use the **"Quick Fill"** button on the Sign-in page or enter these manually:
- **Email**: `demo@example.com`
- **Password**: `password123`

---

## 📡 API Reference

Access the interactive API documentation at `http://localhost:8080/api/docs` (when the backend is running).

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/auth/login` | `POST` | Authenticate user and receive tokens |
| `/auth/register` | `POST` | Register a new user |
| `/events` | `GET` | Fetch events with pagination and filters |
| `/events/:id` | `PATCH` | Update existing event details |
| `/events/share/:token` | `GET` | Get public data for a shared event |

---

## 🚀 Deployment

1. **Database**: Host on Supabase or Neon.
2. **Backend**: Deploy to Render or railway as a web service.
3. **Frontend**: Deploy to Vercel (seamless Next.js support).

**Built with ❤️ for Event Organizers.**
