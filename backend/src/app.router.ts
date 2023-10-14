import { inject, injectable } from "inversify";
import { UserController } from "./modules/user/user.controller";
import { Application, Request, Response, NextFunction } from "express";
import { type } from "./constants/inversify.constant";
import IController from "./interfaces/controller.interface";
import { APIKeyGuardMiddleware } from "./middlewares/api-key-guard.middleware";
import { JWTKeyGuardMiddleware } from "./middlewares/jwt-guard.middleware";
import { ProductController } from "./modules/product/product.controller";

@injectable()
export class AppRouter {
  @inject(type.UserController) private readonly userController!: UserController;
  @inject(type.ProductController) private readonly productController!: ProductController;

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

    app.post("/product/category", JWTKeyGuardMiddleware, this.getController(this.productController, "createCategory"));
    app.get("/product/category", this.getController(this.productController, "findCategories"));

    app.post("/product", JWTKeyGuardMiddleware, this.getController(this.productController, "create"));
    app.get("/product", this.getController(this.productController, "findAll"));
    app.get("/product/:id", this.getController(this.productController, "find"));
  }
}
