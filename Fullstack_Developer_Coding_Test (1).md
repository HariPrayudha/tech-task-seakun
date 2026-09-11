# Fullstack Developer — Coding Test

## Overview

Build a simple **Product Inventory Management** application. This test evaluates your ability to design and implement a backend API and a frontend that consumes it, using a clean, decoupled architecture.

You will build **two separate projects inside one repository** (a monorepo layout) — a backend service and a frontend application. They must NOT be merged into a single monolithic project; each should be independently runnable.

---

## Tech Stack Requirements

### Backend
- **Node.js + TypeScript**
- Any Node.js framework of your choice (Express, Fastify, NestJS, Hono, etc.)
- **ORM** is allowed and encouraged (Prisma, TypeORM, Drizzle, Sequelize, etc.)
- **Database**: PostgreSQL or MySQL (your choice)
- No authentication/authorization required

### Frontend
- **Vue.js** (Vue 3 recommended, Composition API preferred but not mandatory)
- **TailwindCSS** is allowed and encouraged for styling
- State management library is optional (Pinia, Vuex, or plain composables)

### Infrastructure
- **Docker is preferred** — providing a `docker-compose.yml` that spins up the backend, frontend, and database together is a strong plus, but not a hard blocker if you run out of time (document manual setup steps instead).

---

## Repository Structure

Use a monorepo layout with two clearly separated projects, for example:

```
/repo-root
  /backend      → Node.js + TypeScript API
  /frontend     → Vue.js application
  docker-compose.yml   (optional but preferred)
  README.md
```

Each folder should have its own `package.json`, its own dependencies, and be runnable independently of the other.

---

## Functional Requirements

Build a **Product** management feature with full CRUD via a REST (or GraphQL, if you prefer) API, consumed by the frontend.

### Data Model — `Product`
| Field       | Type      | Notes                          |
|-------------|-----------|---------------------------------|
| id          | UUID/int  | Primary key                     |
| name        | string    | Required                        |
| description | string    | Optional                        |
| price       | decimal   | Required, must be ≥ 0           |
| stock       | integer   | Required, must be ≥ 0           |
| category    | string    | Optional                        |
| imageUrl    | string    | Path/URL to the uploaded product image, nullable |
| createdAt   | datetime  | Auto-generated                  |
| updatedAt   | datetime  | Auto-updated                    |

Feel free to add 1–2 extra fields if it makes sense for your design.

### Backend — Required Endpoints
| Method | Endpoint            | Description                     |
|--------|----------------------|----------------------------------|
| GET    | `/products`          | List all products (pagination and/or search/filter by name or category is a plus) |
| GET    | `/products/:id`       | Get a single product by ID       |
| POST   | `/products`           | Create a new product             |
| PUT/PATCH | `/products/:id`     | Update an existing product       |
| DELETE | `/products/:id`       | Delete a product                 |
| POST   | `/products/:id/image` | Upload/replace the product's image (multipart/form-data) |

Requirements:
- Proper HTTP status codes (200, 201, 400, 404, 500, etc.)
- Basic input validation (e.g. `price` and `stock` cannot be negative, `name` is required)
- Sensible JSON error response format
- No authentication/authorization needed

### Image Upload Requirements
- Accept a single image file per product (`multipart/form-data`), field name of your choice (e.g. `image`).
- Store the uploaded file in a **local folder** on the backend (e.g. `/backend/uploads`) — no need for S3/Cloudinary or any external storage service.
- Validate file type (only image mime types — jpg/png/webp) and a reasonable max size (e.g. 2–5MB); reject anything else with a proper error response.
- Serve the stored images back as static files (e.g. `GET /uploads/:filename`) so the frontend can render them via `imageUrl`.
- Save the resulting path/URL into the product's `imageUrl` field.
- If using Docker, mount the `/backend/uploads` folder as a volume so uploaded files persist across container restarts.

### Frontend — Required Pages/Views
1. **Product List** — table or card view of all products (including thumbnail image), with a delete action per row.
2. **Create Product** — a form to add a new product, including an image upload input with a preview before submitting.
3. **Edit Product** — a form (can reuse the create form) to update an existing product, including replacing the image.
4. **Product Detail** (optional but nice to have) — view a single product's full details, including its image.

Requirements:
- Basic client-side validation on forms (including image type/size before upload)
- Loading and error states when calling the API (including upload progress/failure)
- Show a placeholder image when a product has no `imageUrl`
- Reasonably clean, responsive UI (Tailwind encouraged, but polish is not the main focus)

---

## Evaluation Criteria

| Area | What we're looking for |
|------|--------------------------|
| **Project structure** | Clear separation between backend and frontend, sensible folder organization, no monolith |
| **Code quality** | TypeScript usage (proper typing, avoid excessive `any`), readability, consistency |
| **API design** | RESTful conventions, correct status codes, validation, error handling |
| **Database design** | Sensible schema, correct use of ORM, migrations if applicable |
| **Frontend implementation** | Component structure, state handling, API integration, UX basics |
| **Docker/setup** | Ease of running the project locally (bonus points if Dockerized) |
| **Documentation** | Clear README with setup instructions |
| **Git history** | Meaningful commits (avoid a single "final commit") |

---

## Submission Instructions

1. Push your code to a public GitHub repository (or share a private repo with access granted).
2. Include a **README.md** at the root with:
   - Tech stack used
   - How to run the backend (env vars, DB setup, migrations)
   - How to run the frontend
   - How to run via Docker (if implemented)
   - Any assumptions or trade-offs you made
3. Estimated time to complete: **2–4 days**. There's no need to over-engineer — we care more about clean, working code than exhaustive features.
4. If you don't have time to finish everything, prioritize a working CRUD flow end-to-end over partial features across the board, and note what's missing in the README.

---

## Notes for Candidate

- You're free to choose any specific libraries/frameworks within the stated stack (e.g. Express vs Fastify, Prisma vs TypeORM).
- Feel free to add reasonable extras (pagination, search, sorting) if time allows — but a clean, correct, minimal implementation is preferred over a rushed, feature-heavy one.
- If any requirement is ambiguous, make a reasonable assumption and document it in the README rather than leaving it unhandled.
