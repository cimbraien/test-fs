import { ValidationErrorItem } from "joi";
import { BaseException } from "./base.exception";

export class ValidationException extends BaseException {
  constructor(scope: string, data: ValidationErrorItem[]) {
    super(`${scope}/bad-request`, "Validation error", 400, data);
  }
}
