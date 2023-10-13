import { Response } from "express";

export class BaseResponse {
  ok: boolean;
  status: number;
  result: Object;

  constructor(res: Response, ok: boolean, status: number, result?: Object) {
    this.ok = ok;
    this.status = status;
    this.result = result || {};

    res.status(this.status).json(this).send();
  }
}
