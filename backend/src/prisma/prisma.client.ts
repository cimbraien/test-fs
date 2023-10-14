import { PrismaClient } from "@prisma/client";
import { injectable } from "inversify";

@injectable()
export class Prisma {
  public client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }
}
