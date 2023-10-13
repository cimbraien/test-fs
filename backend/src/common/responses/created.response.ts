import { Response } from "express";
import { BaseResponse } from "./base.response";

export class CreatedResponse extends BaseResponse {
  constructor(res: Response, data?: Object) {
    super(res, true, 201, data);
  }
}
