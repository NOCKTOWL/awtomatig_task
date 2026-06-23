# Awtomatig Task Manager

A simple full-stack Task Manager application built with **Next.js**, **Prisma ORM**, and **PostgreSQL**.

This project was developed as part of the AWTOMATIG Full Stack Intern take-home assessment.

---

## Features

- Create a new task
- View all tasks
- Update task status
- Delete tasks
- RESTful API using Next.js Route Handlers
- PostgreSQL database using Prisma ORM
- Responsive UI built with Tailwind CSS

---

## Tech Stack

### Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

### Backend

- Next.js API Routes
- Prisma ORM

### Database

- PostgreSQL (Supabase)

### Deployment

- Vercel

---

## Project Structure

```
.
├── app
│   ├── api
│   │   └── tasks
│   ├── components
│   ├── page.tsx
│   └── layout.tsx
│
├── lib
│   ├── prisma.ts
│   └── generated
│
├── prisma
│   └── schema.prisma
│
├── types
│
└── README.md
```

---

## Database Schema

```prisma
model Task {
  id          String   @id @default(cuid())
  title       String   @db.VarChar(255)
  description String   @db.Text
  status      Status   @default(PENDING)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum Status {
  PENDING
  IN_PROGRESS
  DONE
}
```

---

## API Endpoints

### Get all tasks

```
GET /api/tasks
```

Returns every task ordered by creation date.

---

### Create task

```
POST /api/tasks
```

Example request:

```json
{
  "title": "Complete assignment",
  "description": "Finish the internship task",
  "status": "PENDING"
}
```

---

### Update task status

```
PATCH /api/tasks/:id
```

Example:

```json
{
  "status": "DONE"
}
```

---

### Delete task

```
DELETE /api/tasks/:id
```

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/NOCKTOWL/awtomatig_task.git
```

Navigate into the client application:

```bash
cd awtomatig_task
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env` file inside the `client` folder.

```env
DATABASE_URL="your_postgresql_connection_string"
DIRECT_URL="your_postgresql_connection_string"
```

---

## Prisma

Generate Prisma Client

```bash
npx prisma generate
```

Push schema to the database

```bash
npx prisma db push
```

---

## Run the development server

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

## Build for Production

```bash
npm run build
```

Run the production server

```bash
npm start
```

---

## Deployment

The application is designed to be deployed on **Vercel** with a PostgreSQL database.

Required environment variable:

```
DATABASE_URL
DIRECT_URL
```

---

## Author

**Mehedi Hasan Nabil**

GitHub:
https://github.com/NOCKTOWL