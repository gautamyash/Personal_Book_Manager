# Personal Book Manager

A modern personal library application that helps readers organize, manage, and track their books. Users can securely create an account, maintain their own private collection, update reading progress, and organize books using tags.

Built with the **MERN stack principles** using **Next.js**, **MongoDB**, **Mongoose**, **React**, **Node.js**, **TypeScript**, and **Tailwind CSS**.

---

# Features

### Authentication

- User registration (Sign Up)
- Secure Login & Logout
- Passwords hashed using **bcrypt**
- JWT authentication
- JWT stored in **httpOnly cookies**
- Protected routes using `proxy.ts`
- Authenticated users cannot access Login/Signup pages

---

### Book Management

Each authenticated user has their own private collection.

Users can:

- Add new books
- Edit existing books
- Delete books
- Store:
  - Title
  - Author
  - Reading Status
  - Tags

---

### Reading Status

Books can be organized into three reading states:

- 📖 Want to Read
- 📘 Reading
- ✅ Completed

---

### Filtering

Users can filter books by:

- Reading Status
- Tags

---

### Dashboard

Dashboard includes:

- Total Books
- Want to Read Count
- Reading Count
- Completed Count
- Complete Book List
- Edit Book
- Delete Book

---

# Tech Stack

| Layer            | Technology                                 |
| ---------------- | ------------------------------------------ |
| Frontend         | Next.js 16 (App Router), React, TypeScript |
| Styling          | Tailwind CSS                               |
| Backend          | Next.js API Routes                         |
| Runtime          | Node.js                                    |
| Database         | MongoDB Atlas                              |
| ODM              | Mongoose                                   |
| Authentication   | JWT + httpOnly Cookies                     |
| Password Hashing | bcrypt                                     |

---

# Folder Structure

```text
app/
│
├── api/
│   ├── auth/
│   │   ├── signup
│   │   ├── login
│   │   └── logout
│   │
│   └── books/
│       ├── route.ts
│       └── [id]/route.ts
│
├── dashboard/
├── login/
├── signup/
└── page.tsx

components/
└── books/
    ├── BookForm.tsx
    ├── BookList.tsx
    └── EditBookModal.tsx

lib/
├── api/
└── mongodb.ts

models/
├── User.ts
└── Book.ts

types/
└── book.ts

proxy.ts
```

---

# Getting Started

## Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

---

## Installation

Clone the repository

```bash
git clone https://github.com/gautamyash/Personal_Book_Manager.git
```

Go inside the project

```bash
cd personal-book-manager
```

Install dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env.local` file from the example.

```bash
cp .env.example .env.local
```

Required variables:

| Variable             | Required | Description                                                                                              |
| -------------------- | -------- | -------------------------------------------------------------------------------------------------------- |
| MONGODB_URI          | ✅       | MongoDB Atlas connection string                                                                          |
| JWT_SECRET           | ✅       | Secret used for signing JWT tokens                                                                       |
| MONGODB_URI_STANDARD | Optional | Standard MongoDB connection string for environments where `mongodb+srv://` DNS resolution is unavailable |

---

# Running the Project

Development

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

Production

```bash
npm run build
npm start
```

---

# Authentication Flow

1. Create an account using **Sign Up**
2. Login using your credentials
3. Access the protected Dashboard
4. Manage your books
5. Logout securely

---

# Testing the Application

After deployment:

1. Open the Live URL.
2. Create a new account using the **Sign Up** page.
3. Log in with the newly created credentials.
4. Add books.
5. Edit books.
6. Delete books.
7. Filter books by status and tags.
8. Logout.

> **Note:** No pre-created demo account is provided. Each reviewer can create their own account using the Sign Up page.

---

# Security

- Passwords are hashed using bcrypt
- JWT stored in httpOnly cookies
- Protected API routes
- User-specific data isolation
- Every database query is scoped using the authenticated user's ID

---

# Design Decisions

- Uses **Next.js App Router**
- Uses **proxy.ts** for route protection (Next.js 16 convention)
- MongoDB collections managed with **Mongoose**
- Reading status implemented as a simple enum:
  - want
  - reading
  - completed
- Each user's books remain completely isolated from other users

---

# Deployment

Hosted on:

- **Vercel**
- **MongoDB Atlas**

Environment Variables required on Vercel:

- `MONGODB_URI`
- `JWT_SECRET`

---

## Live Demo

**Application**

https://personal-book-manager-virid.vercel.app

**GitHub Repository**

https://github.com/gautamyash/Personal_Book_Manager

---

# Build Verification

The application has been successfully verified with:

```bash
npm run build
```

Build Status:

- ✅ TypeScript Passed
- ✅ Production Build Passed
- ✅ Static Pages Generated
- ✅ API Routes Compiled Successfully

---

# Author

**Yash Gautam**

GitHub:
https://github.com/gautamyash
