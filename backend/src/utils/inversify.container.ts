import { Container } from "inversify";
import "reflect-metadata";
import { Prisma } from "../prisma/prisma.client";
import { UserService } from "../modules/user/user.service";
import { UserRepository } from "../modules/user/user.repository";
import { UserController } from "../modules/user/user.controller";
import { AppRouter } from "../app.router";
import { type } from "../constants/inversify.constant";

const container = new Container({ defaultScope: "Singleton" });
container.bind(AppRouter).to(AppRouter);
container.bind<Prisma>(type.Prisma).to(Prisma);

container.bind<UserRepository>(type.UserRepository).to(UserRepository);
container.bind<UserService>(type.UserService).to(UserService);
container.bind<UserController>(type.UserController).to(UserController);

export default container;

