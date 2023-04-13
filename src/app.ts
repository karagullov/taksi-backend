import express, { Express } from "express";
import { Server } from "http";
import { inject, injectable } from "inversify";
import { IExeptionFilter } from "./errors/exeption.filter.interface";
import { ILogger } from "./logger/logger.interface";
import { TYPES } from "./types";
import { UsersController } from "./users/users.controller";
import { IDriversController } from "./drivers/controllers/drivers.controller.interface";
import { DriversController } from "./drivers/controllers/drivers.controller";
import { IConfigService } from "./config/config.service.interface";
const mongoose = require("mongoose");

@injectable()
export class App {
  app: Express;
  server: Server;
  port: number;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.UsersController) private userController: UsersController,
    @inject(TYPES.DriversController)
    private driversController: DriversController,
    @inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
    @inject(TYPES.ConfigService) private configService: IConfigService
  ) {
    this.app = express();
    this.port = +this.configService.get("PORT") || 8000;
  }

  useMiddleware(): void {
    this.app.use(express.json());
  }

  useRoutes(): void {
    this.app.use("/users", this.userController.router);
    this.app.use("/drivers", this.driversController.router);
  }

  useExeptionFilters(): void {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }

  public async init(): Promise<void> {
    this.useMiddleware();
    this.useRoutes();
    this.useExeptionFilters();
    await mongoose.connect(this.configService.get("dbURL"));
    this.server = this.app.listen(this.port);
    this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
  }
}
