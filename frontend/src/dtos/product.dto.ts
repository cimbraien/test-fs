export interface ProductDto {
  id: string;
  categoryId: string;
  categoryName: string;
  name: string;
  sku?: string;
  description?: string;
  weight: number;
  length: number;
  height: number;
  imageUrl: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
}

export interface CreateProductDto {
  categoryId: string;
  name: string;
  sku: string;
  description: string;
  weight: number;
  length: number;
  height: number;
  price: number;
  image: File;
}

export type UploadProductDto = Partial<CreateProductDto> & {imageUrl: string} 