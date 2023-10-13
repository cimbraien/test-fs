import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../common/exceptions/unauthorized.exception";
import { JWTUtil } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";

export type UserPayload = Partial<JwtPayload>

export async function JWTKeyGuardMiddleware(req: Request, _res: Response, next: NextFunction) {
  try {
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer "))
      throw new Error();

    const token = req.headers.authorization.slice(7);
    const verifiedToken = JWTUtil.verifyToken(token);

    req.user = verifiedToken.payload as JwtPayload;
    next(false);
  } catch (err) {
    next(new UnauthorizedException());
  }
}
