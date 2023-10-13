import { Logger, createLogger, format, level } from "winston";
import { Console } from "winston/lib/winston/transports";
import { APP_LOG_LEVEL } from "../configs/app.config";

export enum LOGLEVEL {
  ERROR = "error",
  DEBUG = "debug",
  INFO = "info",
  TRACE = "trace",
}

export class LoggerUtil {

  static getLogger(context?: String) {
    return createLogger({
        levels: this.getLevels(),
        format: format.combine(format.timestamp(), format.json()),
        transports: [new Console({ level: APP_LOG_LEVEL })],
        defaultMeta: { context },
      });
  }

  private static getLevels() {
    return {
      error: 0,
      info: 1,
      debug: 2,
      trace: 3,
    };
  }
}
