# Job Application Manager

A full-stack job application tracking system built with Java, Spring Boot, Angular, and PostgreSQL.

The project serves as a hands-on environment for learning and implementing containerization, orchestration, CI/CD, and infrastructure automation.

## Tech Stack

**Backend**
- Java 17
- Spring Boot 4
- Spring Data JPA
- Maven

**Frontend**
- Angular
- TypeScript

**Database**
- PostgreSQL 17

**DevOps**
- Docker
- Docker Compose
- Kubernetes (planned)
- Helm (planned)
- GitHub Actions (planned)
- Prometheus & Grafana (planned)

## Features

- Create job applications
- View saved applications
- Update application details and status
- Delete applications
- Persist application data in PostgreSQL

## Project Structure

```text
job-application-manager/
├── backend/       # Spring Boot REST API
├── frontend/      # Angular application
├── compose.yaml   # PostgreSQL container configuration
└── README.md
```

## Running Locally

### Prerequisites

- Java 17
- Node.js and npm
- Docker Desktop

### 1. Start PostgreSQL

From the project root:

```bash
docker compose up -d
```

### 2. Start the backend

From the `backend` directory:

```bash
./mvnw spring-boot:run
```

On Windows PowerShell, use `.\mvnw.cmd spring-boot:run`.

The API runs at `http://localhost:8080`.

### 3. Start the frontend

From the `frontend` directory:

```bash
npm install
npm start
```

Open `http://localhost:4200`.

## Roadmap

- [x] Full-stack application setup
- [x] REST API and PostgreSQL integration
- [x] Basic CRUD operations
- [ ] Containerize backend and frontend
- [ ] Multi-container Docker Compose deployment
- [ ] Kubernetes deployment
- [ ] Helm charts
- [ ] GitHub Actions CI/CD
- [ ] Monitoring with Prometheus and Grafana

## Project Status

**
