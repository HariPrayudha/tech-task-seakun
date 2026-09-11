# System Architecture

## 1. Repository layout

```text
/backend
  /src
  /prisma
  /uploads
  package.json

/frontend
  /src
  package.json

docker-compose.yml
README.md
AGENTS.md
PRD.md
ARCHITECTURE.md
API_SPEC.md
DATABASE.md
DEVELOPMENT_PLAN.md
DECISIONS.md
```

There is intentionally no `/database` project. MySQL is an infrastructure service managed by Docker Compose, while Prisma schema and migrations live in `backend/prisma/`.

## 2. Runtime components

```text
Browser
  |
  v
Vue frontend (Vite + TailwindCSS)
  |
  | HTTP/JSON and multipart upload
  v
Express backend (TypeScript + Zod)
  |                |
  | Prisma         | static file serving
  v                v
MySQL          backend/uploads
```

## 3. Backend boundaries

Recommended backend layers:

- `routes/`: route declarations and middleware composition.
- `controllers/`: translate HTTP requests/responses.
- `services/`: product and image business logic.
- `schemas/`: Zod request and query schemas.
- `repositories/` or Prisma access module: persistence operations.
- `middleware/`: error handling, validation, upload handling, and not-found behavior.
- `lib/`: Prisma client and shared backend utilities.

Controllers should remain thin. Services own business rules. Database access must not be spread across route files.

## 4. Frontend boundaries

Recommended frontend structure:

- `views/`: product list, create, edit, and detail screens.
- `components/`: form, table/card, image preview, pagination, and feedback components.
- `composables/`: reusable UI and data behavior.
- `services/`: Axios API client and product API functions.
- `stores/`: optional Pinia state when shared state becomes useful.
- `types/`: API and domain types.

The frontend must call the backend through a small API service layer rather than embedding URLs in every component.

## 5. Request flow

1. Vue form validates obvious client-side errors.
2. Axios sends JSON to the product endpoint.
3. Express validates the request with Zod.
4. Product service persists through Prisma.
5. The frontend receives the normalized API response and updates or reloads the relevant view.
6. If an image was selected, the frontend sends a separate multipart request to the product image endpoint.

## 6. Configuration

Backend configuration must come from environment variables. At minimum:

- `PORT`
- `DATABASE_URL`
- `UPLOAD_DIR`
- `MAX_IMAGE_SIZE_BYTES`
- `CORS_ORIGIN`

Frontend configuration must use a Vite public environment variable for the API base URL, for example `VITE_API_BASE_URL`.

## 7. Docker services

The initial Compose setup will contain:

- `mysql`: persistent named volume and health check.
- `backend`: waits for MySQL health, runs migrations as documented, and mounts uploads.
- `frontend`: serves the development or production frontend according to the chosen Docker setup.

The exact image, ports, commands, and health-check behavior will be finalized during implementation and documented in `README.md`.
