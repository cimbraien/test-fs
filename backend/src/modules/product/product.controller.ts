import { inject, injectable } from "inversify";
import IController from "../../interfaces/controller.interface";
import { ProductService } from "./product.service";
import { type } from "../../constants/inversify.constant";
import { Request, Response } from "express";
import { CreateProductCategorySchema, CreateProductSchema } from "./product.validation.schema";
import { ValidationException } from "../../common/exceptions/validation.exception";
import { CreatedResponse } from "../../common/responses/created.response";
import { OkResponse } from "../../common/responses/ok.response";
import { CreateProductDto } from "./product.dto";
import { PaginationDto } from "../../common/schema/pagination.dto";
import { PaginationSchema } from "../../common/schema/pagination.schema";
import { FindByIdSchema } from "../../common/schema/find-by-id.schema";

@injectable()
export class ProductController extends IController {
  constructor(@inject(type.ProductService) private readonly productService: ProductService) {
    super();
  }

  async createCategory(req: Request, res: Response) {
    const schema = CreateProductCategorySchema.validate(req.body);
    if (schema.error) throw new ValidationException("product-category", schema.error.details);

    const { name } = schema.value;
    const productCategory = await this.productService.createCategory(name);

    return new CreatedResponse(res, productCategory);
  }

  async findCategories(_req: Request, res: Response) {
    const productCategories = await this.productService.findCategories();

    return new OkResponse(res, productCategories);
  }

  async create(req: Request, res: Response) {
    const schema = CreateProductSchema.validate(req.body);
    if (schema.error) throw new ValidationException("product", schema.error.details);

    const dto: CreateProductDto = schema.value;
    const product = await this.productService.createProduct(dto, req.user);

    return new CreatedResponse(res, product);
  }

  async findAll(req: Request, res: Response) {
    const paginationDto: PaginationDto = PaginationSchema.validate(req.query).value;

    const products = await this.productService.findAll(paginationDto);

    return new OkResponse(res, products);
  }

  async find(req: Request, res: Response) {
    const schema = FindByIdSchema.validate(req.params);
    if (schema.error) throw new ValidationException("product", schema.error.details);

    const { id } = schema.value;
    const product = await this.productService.findById(id);

    return new OkResponse(res, product);
  }
}
