import { BaseException } from "./base.exception";

export class UnauthorizedException extends BaseException {
  constructor() {
    super("common/unauthorized", "unauthorized", 401);
  }
}
