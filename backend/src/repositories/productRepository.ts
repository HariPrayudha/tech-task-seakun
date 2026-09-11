import type { Prisma, Product } from "../generated/prisma/client.js";
import { prisma } from "../lib/prisma.js";

export type ProductListArgs = {
  where: Prisma.ProductWhereInput;
  orderBy: Prisma.ProductOrderByWithRelationInput;
  skip: number;
  take: number;
};

export interface ProductRepository {
  create(data: Prisma.ProductCreateInput): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  findMany(args: ProductListArgs): Promise<{ products: Product[]; totalItems: number }>;
  update(id: string, data: Prisma.ProductUpdateInput): Promise<Product>;
  delete(id: string): Promise<void>;
}

export class PrismaProductRepository implements ProductRepository {
  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    return prisma.product.create({ data });
  }

  async findById(id: string): Promise<Product | null> {
    return prisma.product.findUnique({ where: { id } });
  }

  async findMany(args: ProductListArgs): Promise<{ products: Product[]; totalItems: number }> {
    const [products, totalItems] = await prisma.$transaction([
      prisma.product.findMany(args),
      prisma.product.count({ where: args.where }),
    ]);

    return { products, totalItems };
  }

  async update(id: string, data: Prisma.ProductUpdateInput): Promise<Product> {
    return prisma.product.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await prisma.product.delete({ where: { id } });
  }
}

export const productRepository = new PrismaProductRepository();
