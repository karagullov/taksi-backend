import express, { Express } from "express";
import { Server } from "http";
import { inject, injectable } from "inversify";
import { ILogger } from "./logger/logger.interface";
import { TYPES } from "./types";
import { usersRouter } from "./users/users";

@injectable()
export class App {
  app: Express;
  server: Server;
  port: number;

  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    this.app = express();
    this.port = 8000;
  }

  useRoutes() {
    this.app.use("/users", usersRouter);
  }

  public async init() {
    this.useRoutes();
    this.server = this.app.listen(this.port);
    this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
  }
}
