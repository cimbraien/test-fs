import { Response } from "express";
import { BaseResponse } from "./base.response";

export class OkResponse extends BaseResponse {
  constructor(res: Response, data?: Object) {
    super(res, true, 200, data);
  }
}
