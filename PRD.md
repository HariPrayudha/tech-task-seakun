# Product Inventory Management — Product Requirements Document

## 1. Product summary

Build a small inventory management application for creating, browsing, editing, and deleting products. The application is intended as a fullstack developer coding test and must demonstrate a clean separation between a Node.js API and a Vue.js frontend.

The product does not require authentication or authorization. It is designed for a single local development/demo workspace.

## 2. Goals

- Provide a complete product CRUD flow from the Vue frontend to the Express API.
- Store product data in MySQL through Prisma migrations.
- Support local product image upload, replacement, and serving.
- Make the product list usable with search, category filtering, pagination, and sorting.
- Make the project easy to run with Docker Compose.
- Keep the code typed, validated, documented, and easy to review.

## 3. Non-goals

- User accounts, authentication, or authorization.
- Inventory transactions, suppliers, purchasing, sales, or reporting.
- External object storage such as S3 or Cloudinary.
- Multi-tenant behavior.
- Real-time updates.
- A separate database service application in the repository.

## 4. Target users

The primary user is a small business operator or internal staff member who needs to maintain a basic product catalog and stock values.

## 5. Functional requirements

### Product list

- Display products in a responsive table or card layout.
- Show name, thumbnail, category, price, stock, and updated date.
- Search by product name.
- Filter by category.
- Paginate results.
- Sort by supported product fields.
- Provide links/actions to edit, view detail, and delete.
- Show loading, empty, and error states.

### Create product

- Required fields: name, price, and stock.
- Optional fields: description and category.
- Validate price and stock as non-negative values.
- Preview a selected image before upload.
- Validate image type and size in the browser before sending.
- Create the product, then upload its image when an image is selected.

### Edit product

- Load existing product data into a reusable form.
- Update product fields.
- Optionally replace the image.
- Preserve the existing image if no replacement is selected.

### Product detail

- Display all product fields and the full image when available.
- Display a placeholder when no image exists.

### Delete product

- Require a confirmation step in the frontend.
- Delete the product through the API.
- Remove its local image file when applicable.

## 6. Data requirements

The required Product fields are `id`, `name`, `description`, `price`, `stock`, `category`, `imageUrl`, `createdAt`, and `updatedAt`. The exact database and API decisions are defined in `DATABASE.md` and `API_SPEC.md`.

## 7. Quality requirements

- Backend and frontend are separate projects with their own `package.json` files.
- Backend uses TypeScript, Express, Zod, and Prisma.
- Frontend uses Vue 3, TypeScript, Vite, and TailwindCSS.
- API errors use a consistent JSON shape.
- Uploads accept only JPG, PNG, and WebP images within the configured limit.
- The project can be started with Docker Compose.
- README contains environment, migration, local, and Docker instructions.

## 8. Acceptance criteria

- A fresh setup can start MySQL, backend, and frontend with the documented Docker command.
- A user can create, list, search, filter, sort, edit, view, and delete products.
- A user can upload and replace a valid product image.
- Invalid product data and invalid image files are rejected with useful errors.
- Pagination metadata is returned and used by the frontend.
- The backend returns correct status codes for success, validation errors, missing records, and unexpected errors.
- The frontend remains usable on desktop and mobile-sized screens.
- The repository contains no hard-coded secrets or machine-specific paths.

## 9. Priority

### Must have

CRUD, MySQL persistence, Prisma migrations, image upload/serving, validation, list search/filter/pagination/sorting, responsive frontend, Docker Compose, and README.

### Should have

Product detail page, reusable form components, backend tests, frontend tests, graceful image replacement cleanup, and useful empty/error states.

### Could have

Debounced search, optimistic UI, richer table controls, seed data, and accessibility polish.
