import { inject, injectable } from "inversify";
import { IRepository } from "../../interfaces/repository.interface";
import { Product, ProductCategory } from "@prisma/client";
import { Prisma } from "../../prisma/prisma.client";
import { type } from "../../constants/inversify.constant";

@injectable()
export class ProductRepository implements IRepository<Product> {
  constructor(@inject(type.Prisma) private readonly prisma: Prisma) {}

  async create(data: Product): Promise<void> {
    await this.prisma.client.product.create({
      data,
    });
  }

  async findAll(skip?: number, limit?: number): Promise<Product[]> {
    return await this.prisma.client.product.findMany({
      skip,
      take: limit,
      orderBy: [{ updatedAt: "desc" }],
    });
  }

  async find(id: string): Promise<Product | null> {
    return await this.prisma.client.product.findFirst({
      where: { id },
    });
  }

  async findByCategory(categoryId: string): Promise<Product[]> {
    return await this.prisma.client.product.findMany({
      where: { categoryId },
    });
  }

  async createCategory(data: ProductCategory): Promise<void> {
    await this.prisma.client.productCategory.create({
      data,
    });
  }

  async findCategory(id: string): Promise<ProductCategory | null> {
    return await this.prisma.client.productCategory.findFirst({
      where: { id },
    });
  }

  async findCategories(): Promise<ProductCategory[]> {
    return await this.prisma.client.productCategory.findMany();
  }
}
