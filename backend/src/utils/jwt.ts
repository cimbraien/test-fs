import { User } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../configs/app.config";

export class JWTUtil {
  public static getToken(user: User) {
    const data = {
      email: user.email,
      name: user.name,
    };

    const token = jwt.sign(data, JWT_SECRET, {
      expiresIn: "30m",
      subject: user.id,
    });

    return token;
  }

  public static verifyToken(token: string): jwt.Jwt {
    return jwt.verify(token, JWT_SECRET, { complete: true });
  }
}
