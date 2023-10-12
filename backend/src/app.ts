import "dotenv/config";
import express from "express";
import cors from "cors";
import { Logger } from "./utils/winston.logger";
import { APP_PORT } from "./config/app.config";

const logger = Logger.getLogger("app");

const app = express();

app.use(cors());

app.get("/health", (_, res) => {
  res.send();
})

app.listen(APP_PORT, () => {
  logger.info(`App started on port ${APP_PORT}`);
});
