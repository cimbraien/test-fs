import { Container } from "inversify";
import "reflect-metadata";
import { Prisma } from "../prisma/prisma.client";
import { UserService } from "../modules/user/user.service";
import { UserRepository } from "../modules/user/user.repository";
import { UserController } from "../modules/user/user.controller";
import { AppRouter } from "../app.router";
import { type } from "../constants/inversify.constant";
import { ProductRepository } from "../modules/product/product.repository";
import { ProductService } from "../modules/product/product.service";
import { ProductController } from "../modules/product/product.controller";

const container = new Container({ defaultScope: "Singleton" });
container.bind(AppRouter).to(AppRouter);
container.bind<Prisma>(type.Prisma).to(Prisma);

container.bind<UserRepository>(type.UserRepository).to(UserRepository);
container.bind<UserService>(type.UserService).to(UserService);
container.bind<UserController>(type.UserController).to(UserController);

container.bind<ProductRepository>(type.ProductRepository).to(ProductRepository);
container.bind<ProductService>(type.ProductService).to(ProductService);
container.bind<ProductController>(type.ProductController).to(ProductController);

export default container;
