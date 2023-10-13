import { UserPayload } from "../../middlewares/jwt-guard.middleware";

declare global {
  namespace Express {
    export interface Request {
      user: UserPayload;
    }
  }
}
