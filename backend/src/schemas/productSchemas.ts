import { z } from "zod";

const optionalText = (maxLength: number) =>
  z
    .string()
    .trim()
    .max(maxLength)
    .optional()
    .nullable()
    .transform((value) => (value === "" ? null : value));

const nonNegativePrice = z
  .number()
  .finite()
  .nonnegative()
  .refine((value) => Number.isInteger(value * 100), "Price must have at most 2 decimal places");

export const productIdParamsSchema = z.object({
  id: z.string().uuid("Product id must be a valid UUID"),
});

export const createProductBodySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(255),
  description: optionalText(5000),
  price: nonNegativePrice,
  stock: z
    .number()
    .int()
    .nonnegative("Stock must be greater than or equal to 0")
    .max(4_294_967_295, "Stock exceeds the supported maximum"),
  category: optionalText(120),
});

export const updateProductBodySchema = createProductBodySchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  "At least one field is required",
);

export const listProductsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z
    .string()
    .trim()
    .max(255)
    .optional()
    .transform((value) => (value === "" ? undefined : value)),
  category: z
    .string()
    .trim()
    .max(120)
    .optional()
    .transform((value) => (value === "" ? undefined : value)),
  sortBy: z
    .enum(["name", "price", "stock", "createdAt", "updatedAt"])
    .default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type CreateProductBody = z.infer<typeof createProductBodySchema>;
export type UpdateProductBody = z.infer<typeof updateProductBodySchema>;
export type ProductIdParams = z.infer<typeof productIdParamsSchema>;
export type ListProductsQuery = z.infer<typeof listProductsQuerySchema>;
