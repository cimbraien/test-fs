import { inject, injectable } from "inversify";
import { ProductRepository } from "./product.repository";
import { type } from "../../constants/inversify.constant";
import { Product, ProductCategory } from "@prisma/client";
import { ObjectId } from "bson";
import { ProductCategoryNotFoundException, ProductNotFoundException } from "./product.exception";
import { UserPayload } from "../../middlewares/jwt-guard.middleware";
import { CreateProductDto } from "./product.dto";
import { PaginationDto } from "../../common/schema/pagination.dto";

@injectable()
export class ProductService {
  constructor(@inject(type.ProductRepository) private readonly productRepository: ProductRepository) {}

  async createCategory(name: string): Promise<ProductCategory> {
    const productCategory = {
      id: new ObjectId().toString(),
      name,
    };

    await this.productRepository.createCategory(productCategory);
    return productCategory;
  }

  async findCategories(): Promise<ProductCategory[]> {
    const productCategories = await this.productRepository.findCategories();
    return productCategories;
  }

  async createProduct(dto: CreateProductDto, user: UserPayload): Promise<Product> {
    const category = await this.productRepository.findCategory(dto.categoryId);
    if (!category) throw new ProductCategoryNotFoundException(dto.categoryId);

    const now = new Date();
    const productMeta = {
      id: new ObjectId().toString(),
      categoryName: category.name,
      createdAt: now,
      updatedAt: now,
      updatedBy: user.sub!,
    };
    const product: Product = Object.assign(dto, productMeta);

    await this.productRepository.create(product);
    return product;
  }

  async findAll(paginationDto: PaginationDto) {
    const { skip, limit } = paginationDto;

    const products = await this.productRepository.findAll(skip, limit);
    return products;
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productRepository.find(id);
    if (!product) throw new ProductNotFoundException(id);

    return product;
  }
}
