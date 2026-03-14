# Project Management System

A simple full-stack **Project Management System** that lets users create projects and manage tasks with status, priority, and due dates.

## Tech Stack

### Backend

* Node.js
* Express
* MongoDB + Mongoose

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

---

# Features

* Create and manage **projects**
* Add, update, and delete **tasks**
* Filter tasks by **status**
* Sort tasks by **due date**
* **Paginated** project list
* RESTful API design

---

# Project Structure

```
project
├── backend
└── frontend
```

---

# Prerequisites

Make sure you have:

* Node.js (v18 or higher)
* npm
* MongoDB connection (local or Atlas)

---

# Environment Variables

Create a `.env` file inside the **backend** folder.

```
MONGODB_URI=your_mongodb_connection_string
PORT=8000
```

---

# Installation

### Install backend dependencies

```
cd backend
npm install
```

### Install frontend dependencies

```
cd ../frontend
npm install
```

---

# Run the Project

Open **two terminals**.

### Start Backend

```
cd backend
npm start
```

Backend runs on
`http://localhost:8000`

### Start Frontend

```
cd frontend
npm run dev
```

Frontend runs on
`http://localhost:3000`

---

# API Endpoints

## Projects

```
GET    /projects
GET    /projects/:id
POST   /projects
DELETE /projects/:id
```

Query parameters for `/projects`:

* `page` (default: 1)
* `limit` (default: 10)

---

## Tasks

```
GET    /projects/:project_id/tasks
POST   /projects/:project_id/tasks
PUT    /tasks/:id
DELETE /tasks/:id
```

Query parameters for tasks:

* `status` → todo | in-progress | done
* `sort` → asc | desc

---

# Data Models

### Project

```
name        string (required, unique)
description string
created_at  date (auto generated)
```

### Task

```
project_id  ObjectId (required)
title       string (required)
description string
status      todo | in-progress | done
priority    low | medium | high
due_date    date (required)
created_at  date (auto generated)
```

---

# Example Requests

### Create Project

```
{
  "name": "Website Redesign",
  "description": "Revamp landing page and dashboard"
}
```

### Create Task

```
{
  "title": "Design homepage hero section",
  "description": "Create new layout and CTA",
  "status": "todo",
  "priority": "high",
  "due_date": "2026-04-01T00:00:00.000Z"
}
```

### Update Task

```
{
  "title": "Design homepage hero section",
  "description": "Update with final assets",
  "status": "in-progress",
  "priority": "medium",
  "due_date": "2026-04-05T00:00:00.000Z"
}
```
