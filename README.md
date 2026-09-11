# Product Inventory Management

Fullstack coding test untuk posisi Fullstack Developer di Seakun.

## Status

Phase 4 — Backend Product API dan frontend foundation selesai. Backend mencakup CRUD, Zod validation, consistent error responses, search, category filter, pagination, sorting, local image storage, MIME/signature validation, replacement, cleanup, dan tests. Frontend kini memiliki TailwindCSS, router, shared layout, Pinia store, Axios API client, typed domain models, serta loading/empty/error states. Product CRUD UI lengkap dikerjakan pada Phase 5.

## Struktur yang disepakati

```text
/backend              Node.js + TypeScript + Express API
/frontend             Vue 3 + TypeScript application
docker-compose.yml    Backend, frontend, dan MySQL
```

Tidak ada folder aplikasi database terpisah. MySQL berjalan sebagai service Docker dan Prisma berada di dalam `backend`.

## Dokumentasi proyek

- [AGENTS.md](AGENTS.md) — instruksi kerja Codex dan urutan dokumen yang wajib dibaca.
- [PRD.md](PRD.md) — product requirements dan acceptance criteria.
- [ARCHITECTURE.md](ARCHITECTURE.md) — batasan dan alur sistem.
- [API_SPEC.md](API_SPEC.md) — kontrak REST API.
- [DATABASE.md](DATABASE.md) — model Product dan aturan persistence.
- [DEVELOPMENT_PLAN.md](DEVELOPMENT_PLAN.md) — urutan implementasi.
- [DECISIONS.md](DECISIONS.md) — keputusan teknis yang sudah disepakati.

## Tech stack

- Backend: Node.js, TypeScript, Express, Zod, Prisma.
- Database: MySQL.
- Frontend: Vue 3, TypeScript, Vite, TailwindCSS.
- Frontend utilities: Pinia, Axios, Vue Router.
- Infrastructure: Docker Compose.

## Menjalankan project secara lokal

Backend:

```bash
cd backend
npm install
npm run dev
```

Health check tersedia di `http://localhost:3000/health`.

Untuk database backend:

```bash
cd backend
copy .env.example .env
npm install
npm run db:generate
npm run db:migrate:deploy
```

`db:migrate:deploy` membutuhkan MySQL yang aktif dengan `DATABASE_URL` sesuai environment. Pada repository ini migration awal berada di `backend/prisma/migrations/`.

Test dan quality checks backend:

```bash
cd backend
npm test
npm run typecheck
npm run build
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Frontend tersedia di `http://localhost:5173`. API base URL dapat diatur melalui `frontend/.env` menggunakan `VITE_API_BASE_URL`.

Dengan Docker Compose:

```bash
docker compose up --build
```

Perintah Docker Compose akan menjalankan frontend, backend, dan MySQL. Prisma migration dijalankan dengan `npm run db:migrate:deploy` dari folder `backend` setelah MySQL tersedia.

## Fitur utama

- Product CRUD.
- Upload dan penggantian gambar produk secara lokal.
- Search berdasarkan nama.
- Filter kategori.
- Pagination.
- Sorting.
- Loading, empty, validation, dan error states.
