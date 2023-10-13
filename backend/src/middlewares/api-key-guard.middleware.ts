import { NextFunction, Request, Response } from "express";
import { API_KEY } from "../configs/app.config";
import { ForbiddenException } from "../common/exceptions/forbidden.exception";

export const APIKeyGuardMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const key = req.headers.authorization;
  if (key != API_KEY) throw new ForbiddenException();
	
  next(false);
};
