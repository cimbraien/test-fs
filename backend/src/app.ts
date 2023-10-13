import "dotenv/config";
import express from "express";
import cors from "cors";
import { LoggerUtil } from "./utils/winston.logger";
import { APP_PORT } from "./configs/app.config";
import container from "./utils/inversify.container";
import { AppRouter } from "./app.router";
import { ExceptionHandlerMiddleware } from "./middlewares/exception-handler.middleware";
import { RequestLoggingMiddleware } from "./middlewares/request-logging.middleware";

const logger = LoggerUtil.getLogger("app");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => {
  res.send();
});

app.use(RequestLoggingMiddleware);
const router = container.get<AppRouter>(AppRouter);
router.register(app);

app.use(ExceptionHandlerMiddleware);

app.listen(APP_PORT, () => {
  logger.info(`App started on port ${APP_PORT}`);
});
