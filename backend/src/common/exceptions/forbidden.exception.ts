import { BaseException } from "./base.exception";

export class ForbiddenException extends BaseException {
  constructor() {
    super("common/forbidden", "You don't have access to this resource", 403);
  }
}
