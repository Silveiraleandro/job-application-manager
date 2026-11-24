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


## Continuous Integration

The project uses GitHub Actions to automatically validate changes
on pushes to feature branches and pull requests targeting main.

The CI pipeline consists of three jobs:

| Job | Responsibility |
|-----|----------------|
| Backend Build and Test | Maven build and automated tests with PostgreSQL |
| Frontend Build | Dependency installation and Angular production build |
| Docker Build and Validation | Docker image builds, Compose validation and smoke tests |

The backend and frontend jobs run in parallel.
The Docker validation job runs after both succeed.

## Kubernetes Deployment

The application supports local Kubernetes deployment using Minikube.

### Kubernetes Architecture

| Component | Workload | Service | Port |
|---|---|---|---|
| Frontend | Deployment | ClusterIP | 80 |
| Backend | Deployment | ClusterIP | 8080 |
| PostgreSQL | StatefulSet | Headless Service | 5432 |

### Kubernetes Features

- Declarative infrastructure using YAML manifests
- Namespace isolation
- ConfigMaps and Secrets
- Deployments and ReplicaSets
- StatefulSet for PostgreSQL
- PersistentVolumes and PersistentVolumeClaims
- Internal service discovery and DNS
- CPU and memory requests and limits
- Liveness and readiness probes
- Automatic Pod recovery
- Local access through port forwarding

### Prerequisites

- Docker Desktop
- Minikube
- Git

### Start the Kubernetes Cluster

Stop the Docker Compose environment if it is running:

```bash
docker compose down
```

Start Minikube:

```bash
minikube start --driver=docker
```

### Build and Load Container Images

```bash
docker compose build

minikube image load jobtracker-backend:dev
minikube image load jobtracker-frontend:dev
```

### Configure Database Credentials

Copy `infra/k8s/secret.example.yaml` to
`infra/k8s/secret.yaml`.

Replace the placeholder credentials with your local
database username and password before deploying PostgreSQL.

The actual Secret file is excluded from version control.

PostgreSQL initialization credentials only take effect
when initializing an empty database directory.
Changing a Kubernetes Secret does not automatically
update existing PostgreSQL roles or passwords.

### Deploy the Application

```bash
minikube kubectl -- apply -f infra/k8s/namespace.yaml
minikube kubectl -- apply -f infra/k8s/configmap.yaml
minikube kubectl -- apply -f infra/k8s/secret.yaml
minikube kubectl -- apply -f infra/k8s/postgres.yaml

minikube kubectl -- rollout status statefulset/postgres -n jobtracker

minikube kubectl -- apply -f infra/k8s/backend.yaml

minikube kubectl -- rollout status deployment/backend -n jobtracker

minikube kubectl -- apply -f infra/k8s/frontend.yaml

minikube kubectl -- rollout status deployment/frontend -n jobtracker
```

Apply the manifests individually to avoid accidentally
applying the placeholder Secret.

### Verify the Deployment

```bash
minikube kubectl -- get pods -n jobtracker
minikube kubectl -- get services -n jobtracker
minikube kubectl -- get pvc -n jobtracker
```

### Access the Application

```bash
minikube kubectl -- port-forward service/frontend 4200:80 -n jobtracker
```

Open http://localhost:4200 in your browser.

### Resilience and Persistence Testing

The following scenarios were successfully validated:

- End-to-end CRUD operations
- Automatic backend Pod replacement
- Automatic PostgreSQL Pod replacement
- Database persistence across Pod recreation
- Backend readiness failure during database unavailability
- Automatic backend connectivity recovery without a restart

The current deployment uses single replicas and is
intended for local development and learning rather
than production-grade high availability.

### Stop the Kubernetes Cluster

```bash
minikube stop
```

### Branch Protection

The main branch is protected by a GitHub repository ruleset:

- Pull requests are required before merging.
- All three CI status checks must pass.
- Feature branches must be up to date before merging.
- Force pushes and branch deletion are restricted.

## Roadmap

- [x] Full-stack application setup
- [x] REST API and PostgreSQL integration
- [x] Basic CRUD operations
- [x] Containerize backend and frontend
- [x] Multi-container Docker Compose deployment
- [x] PostgreSQL persistence across container restarts
- [x] GitHub Actions Continuous Integration
- [x] Automated Docker smoke tests
- [x] Branch protection and required CI checks
- [x] Kubernetes deployment
- [ ] Helm charts
- [ ] Continuous Deployment (CD)
- [ ] Monitoring with Prometheus and Grafana

## Project Status

**Day 3 complete:** Automated Continuous Integration using GitHub Actions,
including backend builds and tests, frontend production builds,
Docker image validation, and application smoke tests.

The main branch is protected by a repository ruleset that requires
successful CI checks before merging pull requests.

**Next milestone:** Kubernetes deployment using a local Kubernetes
cluster, includes: Deployments, Services, ConfigMaps, Secrets,
and persistent storage.
