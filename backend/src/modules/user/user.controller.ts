import { inject, injectable } from "inversify";
import { UserService } from "./user.service";
import { NextFunction, Request, Response } from "express";
import { CreateUserDto, LoginDto } from "./user.dto";
import { type } from "../../constants/inversify.constant";
import BaseController from "../../interfaces/controller.interface";
import { Logger } from "winston";
import { LOGLEVEL, LoggerUtil } from "../../utils/winston.logger";
import { CreateUserSchema, LoginSchema } from "./user.validation.schema";
import { ValidationException } from "../../common/exceptions/validation.exception";
import { CreatedResponse } from "../../common/responses/created.response";
import { OkResponse } from "../../common/responses/ok.response";

@injectable()
export class UserController extends BaseController {
  private logger: Logger;
  constructor(@inject(type.UserService) private readonly userService: UserService) {
    super();
    this.logger = LoggerUtil.getLogger("user");
  }

  async createUser(req: Request, res: Response) {
    this.logger.log(LOGLEVEL.TRACE, "start creating user");

    const schema = CreateUserSchema.validate(req.body);
    if (schema.error) throw new ValidationException("user", schema.error.details);

    const createUserDto: CreateUserDto = schema.value;

    await this.userService.create(createUserDto);

    this.logger.log(LOGLEVEL.TRACE, "done creating user");
    return new CreatedResponse(res);
  }

  async login(req: Request, res: Response) {
    this.logger.log(LOGLEVEL.TRACE, "start logging-in user");

    const schema = LoginSchema.validate(req.body);
    if (schema.error) throw new ValidationException("auth", schema.error.details);

    const loginDto: LoginDto = schema.value;

    const accessToken = await this.userService.login(loginDto);

    this.logger.log(LOGLEVEL.TRACE, "done logging-in user");
    return new OkResponse(res, {accessToken});
  }
}
