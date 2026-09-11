# Development Plan

Development must follow these checkpoints. A later phase should not hide a broken earlier phase.

## Phase 0 — Project foundation

- Create the `backend` and `frontend` projects with independent package manifests.
- Add shared environment examples and `.gitignore` rules.
- Add Docker Compose with MySQL and persistent volumes.
- Confirm both apps can start independently.

## Phase 1 — Backend foundation

- Configure TypeScript and Express.
- Configure Prisma for MySQL.
- Add Product schema and initial migration.
- Add environment validation.
- Add centralized error handling and consistent response helpers.

## Phase 2 — Product API

- Implement product create, list, detail, update, and delete.
- Add Zod schemas for body, params, and query parameters.
- Implement search, category filtering, pagination, and sorting.
- Add API tests for normal and invalid cases.

## Phase 3 — Image handling

- Add local uploads directory and static file serving.
- Add MIME and size validation.
- Implement image upload/replacement and cleanup behavior.
- Add tests for invalid files and missing products.

## Phase 4 — Frontend foundation

- Configure Vue 3, TypeScript, Vite, and TailwindCSS.
- Add routing and the Axios API client.
- Add shared types and feedback components.

## Phase 5 — Frontend product flow

- Implement product list with search, filter, sorting, pagination, and delete.
- Implement reusable create/edit form.
- Implement image preview and upload progress/failure feedback.
- Implement product detail and placeholder image behavior.

## Phase 6 — Integration and Docker

- Connect frontend and backend through environment-configured URLs.
- Validate Compose startup from a clean environment.
- Verify upload persistence across backend restarts.
- Document all commands in `README.md`.

## Phase 7 — Quality pass

- Run formatting, linting, type checks, tests, and production builds.
- Review API status codes and error messages.
- Review responsive layout and empty/loading/error states.
- Record any remaining trade-offs or incomplete items.
