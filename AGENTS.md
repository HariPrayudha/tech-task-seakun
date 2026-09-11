# AGENTS.md

## Project context

This repository is a fullstack coding test for a Product Inventory Management application. It is a monorepo with two independently runnable applications:

- `backend/`: Node.js, TypeScript, Express, Zod, Prisma, and MySQL integration.
- `frontend/`: Vue 3, TypeScript, Vite, TailwindCSS, and optional Pinia/Axios usage.
- `docker-compose.yml`: local orchestration for backend, frontend, and MySQL.

There is no separate `database/` application or folder. Database infrastructure belongs in Docker Compose and the Prisma schema belongs under `backend/prisma/`.

## Required reading order

Before making a plan, changing code, or answering a repository-specific implementation question, read:

1. `AGENTS.md`
2. `PRD.md`
3. `ARCHITECTURE.md`
4. `API_SPEC.md` for API work
5. `DATABASE.md` for schema, migration, or persistence work
6. `DEVELOPMENT_PLAN.md` for implementation order
7. `DECISIONS.md` for accepted technical decisions and trade-offs

Read `README.md` when changing setup, Docker, environment variables, or developer documentation.

## Working rules

- Keep `backend` and `frontend` independently runnable and independently installable.
- Do not add authentication or authorization unless the user explicitly requests it.
- Do not introduce a separate database application; use MySQL through Docker Compose and Prisma from the backend.
- Preserve the REST endpoint and response contracts in `API_SPEC.md`.
- Validate backend input with Zod. Frontend validation improves UX but does not replace backend validation.
- Keep monetary values non-negative and represent them consistently according to `DATABASE.md` and `API_SPEC.md`.
- Keep uploaded files local under the backend uploads directory. Validate MIME type and file size.
- Update documentation when a technical decision, API contract, data model, or setup process changes.
- Avoid unrelated refactors and do not add dependencies without documenting why they are needed.
- Before declaring work complete, run the relevant lint, typecheck, unit/integration tests, and Docker or build checks that are available.
- Never commit secrets, `.env` files, uploaded product images, or generated dependency directories.

## Current delivery priority

1. Working product CRUD and image upload flow end to end.
2. Correct validation, error handling, search/filter/pagination/sorting.
3. Clear setup through Docker Compose and README documentation.
4. Clean UI and additional polish after the core flow is stable.
