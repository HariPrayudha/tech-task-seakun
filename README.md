# Product Inventory Management

Fullstack coding test untuk posisi Fullstack Developer di Seakun.

## Status

Repository ini sedang berada pada fase perencanaan. Source code backend, frontend, Prisma schema, dan Docker Compose akan dibuat setelah dokumen requirement dan arah teknis disepakati.

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
- Optional frontend libraries: Pinia dan Axios.
- Infrastructure: Docker Compose.

## Fitur utama

- Product CRUD.
- Upload dan penggantian gambar produk secara lokal.
- Search berdasarkan nama.
- Filter kategori.
- Pagination.
- Sorting.
- Loading, empty, validation, dan error states.
