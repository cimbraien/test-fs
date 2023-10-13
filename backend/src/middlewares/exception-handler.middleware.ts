import { NextFunction, Request, Response } from "express";
import { BaseException } from "../common/exceptions/base.exception";

export const ExceptionHandlerMiddleware = (
  err: BaseException,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  res
    .status(err.httpCode || 500)
    .json({
      ok: false,
      status: err.httpCode || 500,
      error: {
        code: err.code,
        message: err.message,
        details: err.data,
      },
    })
    .send();
};
