import { inject, injectable } from "inversify";
import { UserController } from "./modules/user/user.controller";
import { Application, Request, Response, NextFunction } from "express";
import { type } from "./constants/inversify.constant";
import IController from "./interfaces/controller.interface";
import { APIKeyGuardMiddleware } from "./middlewares/api-key-guard.middleware";
import { JWTKeyGuardMiddleware } from "./middlewares/jwt-guard.middleware";

@injectable()
export class AppRouter {
  @inject(type.UserController) private readonly userController!: UserController;

  getController(context: IController, func: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await context[func].bind(context)(req, res, next);
      } catch (error) {
        next(error);
      }
    };
  }

  register(app: Application) {
    app.post("/user", APIKeyGuardMiddleware, this.getController(this.userController, "createUser"));
    app.post("/login", this.getController(this.userController, "login"));
  }
}
