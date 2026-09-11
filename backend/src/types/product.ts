export type ProductResponse = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  category: string | null;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ProductListMeta = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
};
