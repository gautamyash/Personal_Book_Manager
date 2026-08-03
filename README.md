# Personal Book Manager

A personal space for readers to log their books, track reading status, and organize their
collection with tags — built with the MERN stack (MongoDB, Express-style API routes, React,
Node.js) and Next.js.

## Features

- **Authentication** — Sign up, log in, and log out securely. Passwords are hashed with
  bcrypt, and sessions are handled with a JWT stored in an httpOnly cookie. Protected routes
  (`/dashboard`) redirect unauthenticated users to `/login`; the reverse happens for
  authenticated users visiting `/login` or `/signup`.
- **Book collection** — Add, edit, and delete books (title, author, tags, status). Every book
  is scoped to the signed-in user.
- **Filtering** — Filter your collection by reading status or by tag.
- **Dashboard** — At a glance: total books in your collection, and a breakdown by status
  (📖 Want to Read, 📘 Reading, ✅ Completed), plus the full list with inline edit/delete.

## Tech Stack

| Layer      | Choice                                   |
| ---------- | ----------------------------------------- |
| Frontend   | Next.js (App Router), React, TypeScript   |
| Styling    | Tailwind CSS                              |
| Backend    | Next.js API routes (Node.js)              |
| Database   | MongoDB with Mongoose                     |
| Auth       | JWT (httpOnly cookie) + bcrypt            |

## Project Structure

```
app/
  api/
    auth/            signup, login, logout route handlers
    books/            book CRUD route handlers (list/create, get/update/delete by id)
  dashboard/         dashboard page (protected)
  login/, signup/    auth pages
  page.tsx           landing page
components/
  books/             BookForm, BookList, EditBookModal
lib/
  api/               fetch wrappers used by client components
  mongodb.ts         cached Mongoose connection helper
models/               Mongoose schemas (User, Book)
types/                shared TypeScript types
proxy.ts              route protection (Next.js 16's replacement for middleware.ts)
```

## Getting Started

### 1. Prerequisites

- Node.js 18+
- A MongoDB connection string (local MongoDB or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example file and fill in your own values:

```bash
cp .env.example .env.local
```

| Variable               | Required | Description                                                        |
| ----------------------- | -------- | -------------------------------------------------------------------- |
| `MONGODB_URI`           | Yes      | MongoDB connection string.                                          |
| `JWT_SECRET`            | Yes      | Secret used to sign/verify JWTs. Use a long, random string.         |
| `MONGODB_URI_STANDARD`  | No       | Fallback non-SRV connection string if `mongodb+srv://` DNS lookups fail on your network. |

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Build for production

```bash
npm run build
npm start
```

## Deployment

Deployed with [Vercel](https://vercel.com) + [MongoDB Atlas](https://www.mongodb.com/atlas).
Set `MONGODB_URI` and `JWT_SECRET` as environment variables in the Vercel project settings —
they are not committed to the repo.

**Live URL:** _add your deployed link here_

## Notes on Design Decisions

- **Route protection** uses `proxy.ts`, the Next.js 16 convention that replaced
  `middleware.ts` — it checks for a valid JWT cookie before allowing access to `/dashboard`.
- **Data isolation**: every book query is filtered by the authenticated user's id at the
  database level, not just hidden in the UI.
- **Status model**: a book's reading status (`want`, `reading`, `completed`) is a single enum
  field on the Book document, kept intentionally simple rather than a separate progress/log
  collection — this is a personal tracker, not a full reading-analytics platform.
