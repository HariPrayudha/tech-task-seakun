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

## Clean-code standards

- Prefer simple, explicit, maintainable code over clever abstractions or premature generalization.
- Use strict TypeScript. Avoid `any`; define domain, request, response, and component types explicitly.
- Keep each module focused on one responsibility. Keep controllers/routes thin and put business rules in services.
- Do not access Prisma directly from route definitions or frontend views. Use the documented service/API boundaries.
- Validate all untrusted backend input at the boundary with Zod. Treat frontend validation as UX assistance, never as the security boundary.
- Use consistent naming, predictable file placement, small functions, early returns, and clear error handling.
- Do not duplicate business logic, formatting logic, API URL construction, or repeated UI markup when a focused shared utility/component is appropriate.
- Every frontend component that is created must be used by at least one page or another used component. Do not leave dead or speculative components in the repository.
- Build shared UI primitives and layouts for repeated structure (page shell, navigation, buttons, form fields, feedback states, image preview, table/card patterns). Pages should compose these components instead of duplicating their markup.
- Use Vue 3 Composition API with typed props, emits, and exposed state. Keep page-specific orchestration in views/composables and keep presentational components focused.
- Prefer a reusable layout for common frontend chrome. Every user-facing page must use the approved layout unless the page is explicitly a standalone exception.
- Keep components cohesive; split a component only when the extracted component has a clear responsibility and is actually reused or materially improves readability.
- Before adding a dependency or abstraction, confirm it solves a current requirement and document the decision when it affects architecture.
- Preserve accessibility basics: semantic HTML, associated labels, keyboard-operable controls, useful focus states, and meaningful loading/error messages.
- Use comments only to explain non-obvious decisions or constraints; do not comment code that is already self-explanatory.
- Review changed files for dead code, unused imports, duplicated logic, accidental `console.log`, and inconsistent response contracts before completion.

## Current delivery priority

1. Working product CRUD and image upload flow end to end.
2. Correct validation, error handling, search/filter/pagination/sorting.
3. Clear setup through Docker Compose and README documentation.
4. Clean UI and additional polish after the core flow is stable.
