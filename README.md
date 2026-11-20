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
- Multi-stage Docker builds
- Nginx reverse proxy
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

- Docker Desktop

### Run the complete application

From the project root:

```bash
docker compose up -d --build
```

Docker Compose starts three services:

| Service | Technology | Port |
|---------|------------|------|
| Frontend | Angular + Nginx | 4200 |
| Backend | Java 17 + Spring Boot | 8080 |
| Database | PostgreSQL 17 | 5432 |

Open http://localhost:4200 to access the application.

### Stop the application

```bash
docker compose down
```

PostgreSQL data is preserved in a named Docker volume.

### Rebuild after code changes

```bash
docker compose up -d --build
```

### View container logs

```bash
docker compose logs -f
```

### Verify running containers

```bash
docker compose ps
```

Open `http://localhost:4200`.

## Roadmap

- [x] Full-stack application setup
- [x] REST API and PostgreSQL integration
- [x] Basic CRUD operations
- [x] Containerize backend and frontend
- [x] Multi-container Docker Compose deployment
- [x] PostgreSQL persistence across container restarts
- [ ] Kubernetes deployment
- [ ] Helm charts
- [ ] GitHub Actions CI/CD
- [ ] Monitoring with Prometheus and Grafana

## Project Status

**
