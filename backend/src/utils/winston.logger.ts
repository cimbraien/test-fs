import { Logger as WinstonLogger, createLogger, format } from "winston";
import { Console } from "winston/lib/winston/transports";

export class Logger {
  private static logger: WinstonLogger;

  static getLogger(context?: String) {
    if (!this.logger) {
      this.logger = createLogger({
        format: format.combine(format.timestamp(), format.json()),
        transports: [new Console()],
        defaultMeta: {context},
      });
    }

    return this.logger;
  }
}
