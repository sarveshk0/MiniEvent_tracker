# 📅 Mini Event Tracker

A full-stack Event Management System built with **NestJS** (Backend) and **Next.js** (Frontend). Track events, manage attendees, and handle authentication securely.

🚀 **Live Demo:** [https://mini-event-tracker-ifsh.vercel.app/](https://mini-event-tracker-ifsh.vercel.app/)

---

## 🛠️ Tech Stack

*   **Backend:** NestJS, TypeScript, Prisma (ORM), PostgreSQL (Supabase), JWT Auth.
*   **Frontend:** Next.js 14 (App Router), Tailwind CSS, TypeScript, Axios.
*   **Deployment:** Render (Backend), Vercel (Frontend).

---

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (v18 or higher)
*   [Git](https://git-scm.com/)
*   A PostgreSQL Database URL (e.g., from [Supabase](https://supabase.com/))

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Mini-Event-Tracker
```

---

### 2. Backend Setup (`backend` folder)

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # If you face dependency conflicts, run:
    npm install --legacy-peer-deps
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the `backend` folder:
    ```env
    # Database (Supabase Recommended)
    DATABASE_URL="postgresql://postgres:[PASSWORD]@db.xxx.supabase.co:5432/postgres"

    # API Configuration
    PORT=8080
    FRONTEND_URL="http://localhost:3000"

    # Security (Change these for production!)
    JWT_SECRET="super-secret-key"
    JWT_REFRESH_SECRET="super-refresh-secret-key"
    ```

4.  **Run Database Migrations:**
    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **Start the Backend Server:**
    ```bash
    npm run start:dev
    ```
    *Server will run at: `http://localhost:8080`*
    *Swagger Docs: `http://localhost:8080/api/docs`*

---

### 3. Frontend Setup (`frontend` folder)

1.  **Open a new terminal and navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env.local` file in the `frontend` folder:
    ```env
    NEXT_PUBLIC_API_URL="http://localhost:8080/api/v1"
    ```

4.  **Start the Frontend:**
    ```bash
    npm run dev
    ```
    *App will run at: `http://localhost:3000`*

---

## 🌐 Production Deployment Guide

### Backend (Render)
1.  Connect your repo to **Render**.
2.  Set **Root Directory** to `backend`.
3.  Set **Build Command**: `npm install && npx prisma generate && npm run build`
4.  Set **Start Command**: `node dist/main`
5.  Add Environment Variables (`DATABASE_URL`, `JWT_SECRET`, `FRONTEND_URL` etc.) in the Render Dashboard.

### Frontend (Vercel)
1.  Connect your repo to **Vercel**.
2.  Set **Root Directory** to `frontend`.
3.  Add `NEXT_PUBLIC_API_URL` environment variable pointing to your **Render Backend URL**.
4.  Deploy!

---

## 🐞 Troubleshooting

*   **401 Unauthorized Errors?**
    *   Ensure third-party cookies are enabled in your browser if testing cross-site (localhost -> Render).
    *   Verify `FRONTEND_URL` in your backend `.env` matches your frontend address exactly.

*   **Prisma Error P1001?**
    *   Supabase might have paused your project. Login to Supabase and "Restore" it.

---

Made with ❤️ by Kumar
