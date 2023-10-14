import { BaseException } from "../../common/exceptions/base.exception";

export class ProductCategoryNotFoundException extends BaseException {
  constructor(id: string) {
    super("product-category/not-found", "product category not found", 400, { id });
  }
}

export class ProductNotFoundException extends BaseException {
  constructor(id: string) {
    super("product/not-found", "product not found", 404, { id });
  }
}
