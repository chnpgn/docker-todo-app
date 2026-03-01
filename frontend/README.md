# 🐳 Docker To-Do Application

A full-stack **To-Do application** built to demonstrate **Docker, Docker Compose, and real-world containerized workflows**.

The application consists of:

- **Frontend**: React
- **Backend**: ASP.NET Core Web API
- **Database**: PostgreSQL
- **Reverse Proxy (Production)**: Nginx

The project supports **two modes of operation**:
1. **Local (Hybrid) Mode** – frontend & backend run locally, database runs in Docker
2. **Production Mode** – frontend, backend, and database all run in Docker

---

## 📐 Architecture Overview

### Local Development (Hybrid Mode)
    Browser
    ↓
    React Dev Server (localhost:3000)
    ↓
    ASP.NET Core API (localhost:5000)
    ↓
    PostgreSQL (Docker container)
    
    - Fast development and debugging
    - Only PostgreSQL is containerized

---

### Production (Fully Dockerized)
    Browser
    ↓
    Nginx (frontend container :3000)
    ↓
    ASP.NET Core API (backend container :5000)
    ↓
    PostgreSQL (db container)
    
    
    - Everything runs in Docker
    - Docker DNS used internally (`backend`, `db`)
    - Nginx reverse proxy removes CORS and hostname issues

---

## 🧰 Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | React |
| Backend | ASP.NET Core |
| Database | PostgreSQL |
| ORM | Entity Framework Core |
| Containers | Docker |
| Orchestration | Docker Compose |
| Reverse Proxy | Nginx |

---

## 📁 Project Structure
    docker-todo-app/
    │
    ├── frontend/
    │ ├── src/
    │ ├── nginx.conf
    │ ├── Dockerfile
    │ └── package.json
    │
    ├── backend/
    │ └── TodoApi/
    │ ├── Controllers/
    │ ├── Data/
    │ ├── Models/
    │ ├── Program.cs
    │ └── Dockerfile
    │__ docker-compose.db.yml
    ├── docker-compose.yml
    └── README.md

---

# 🚀 Running the App — LOCAL MODE (Development)

In this mode:

    React and ASP.NET Core run **locally**
    PostgreSQL runs in **Docker**

---

## ✅ Prerequisites

    - Node.js 20+
    - .NET SDK 10
    - Docker Desktop
    - Git

---

# 1️⃣ Start PostgreSQL (Docker) and PostgreSQL details

From the project root:

    -  ``>bash
    docker compose -f docker-compose.db.yml up
     
    Host: localhost
    Port: 5432
    Database: todos
    Username: postgres
    Password: postgres

## 2️⃣ Run Backend Locally

    ``>bash
    cd backend/TodoApi
    dotnet restore
    dotnet run

## Backend URL:
    http://localhost:5000

## 3️⃣ Run Frontend Locally

    ``>bash
        cd frontend
        npm install
        npm start

## Frontend URL:
    http://localhost:3000

## ✅ Local Mode Notes

    Frontend calls: http://localhost:5000/api/todos
    No Docker DNS or reverse proxy involved
    Best mode for development and debugging

## 🐳 Running the App — PRODUCTION MODE (Dockerized)

In this mode:

    Frontend, backend, and database all run in Docker
    Nginx proxies API requests
    No hardcoded hostnames or CORS issues

## 1️⃣ Build and Run All Services

From the project root:

    docker compose -f docker-compose.yml build --no-cache
    docker compose -f docker-compose.yml up

## 2️⃣ Access the Application

    Frontend (Browser): http://localhost:3000
    Backend (Internal): http://backend:5000
    Database (Internal): db:5432

⚠️ The browser never talks directly to the backend container.

## 🔁 How API Calls Work in Production

- Browser → /api/todos
       → Nginx (frontend container)
       → backend:5000
       → PostgreSQL

       The React app uses relative URLs: 
       const API = "/api/todos";

This allows the same frontend code to work in:

    Local development
    Docker production
    Cloud deployments

🧪 Features Implemented

    ✅ Create todos
    ✅ Read todos
    ✅ Update todos (inline edit)
    ✅ Toggle completed (checkbox)
    ✅ Delete todos
    ✅ Persistent storage (PostgreSQL)
    ✅ Dockerized production setup