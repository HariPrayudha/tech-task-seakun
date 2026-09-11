# Technical Decisions

## Accepted decisions

| Topic | Decision | Reason |
|---|---|---|
| Repository shape | Monorepo with `/backend` and `/frontend` | Matches the coding test and keeps the applications decoupled |
| Backend framework | Express | Familiar, lightweight, and sufficient for this CRUD API |
| Backend language | TypeScript | Required by the test and improves maintainability |
| Validation | Zod | Runtime validation with strong TypeScript inference |
| Database | MySQL | Explicitly selected for this project |
| ORM | Prisma ORM 7.10.0 + MySQL/MariaDB adapter | Typed queries, migrations, and the stable Prisma 7 client workflow |
| Frontend | Vue 3 + TypeScript + Vite | Matches the requirement and supports a clean component model |
| Styling | TailwindCSS | Fast responsive UI implementation |
| Client HTTP | Axios is allowed | Centralized API client and upload progress support |
| State management | Pinia | Product list state is shared between the dashboard and upcoming product screens |
| Image storage | Local backend uploads directory | Required by the test; avoids external infrastructure |
| Infrastructure | Docker Compose | Reproducible local setup for frontend, backend, and MySQL |
| Frontend styling | TailwindCSS 4.3.3 with the Vite plugin | Current Tailwind integration for Vite with responsive utility classes |
| Authentication | Not included | Explicitly outside the coding test scope |
| API version prefix | Not used initially | Keeps endpoint paths aligned with the requirement (`/products`) |
| Product ID | UUID string | Avoids predictable sequential IDs and works well across services |
| Image upload flow | Create/update product JSON first, upload image separately | Aligns with the dedicated image endpoint in the requirement |

## Pending implementation choices

- Whether the frontend Docker container serves Vite development mode or a production build.
- Exact test runner and coverage thresholds.
- Whether to include repeatable seed data.
- The final visual layout between table-first and card-first responsive views.

These choices must not change the public requirements or API contract without updating the relevant documentation.
