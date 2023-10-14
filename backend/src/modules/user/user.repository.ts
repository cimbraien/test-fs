import { inject, injectable } from "inversify";
import { IRepository } from "../../interfaces/repository.interface";
import { User } from "@prisma/client";
import { Prisma } from "../../prisma/prisma.client";
import { type } from "../../constants/inversify.constant";

@injectable()
export class UserRepository implements IRepository<User> {
  constructor(@inject(type.Prisma) private readonly prisma: Prisma) {}

  async create(data: User): Promise<void> {
    await this.prisma.client.user.create({
      data,
    });
  }
  async findAll(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
  async find(id: string): Promise<User | null> {
    return await this.prisma.client.user.findFirst({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.client.user.findFirst({
      where: { email },
    });
  }
}
