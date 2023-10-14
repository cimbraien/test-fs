export interface CreateProductDto {
  categoryId: string;
  name: string;
  weight: number;
  length: number;
  height: number;
  price: number;
  sku: string | null;
  description: string | null;
  imageUrl: string | null;
}
