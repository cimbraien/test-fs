import * as expressWinston from "express-winston";
import { Console } from "winston/lib/winston/transports";

export const RequestLoggingMiddleware = expressWinston.logger({
  transports: [new Console()],
});
