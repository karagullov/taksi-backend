import { NextFunction, Request, Response, response } from "express";
import { BaseController } from "../../common/base.controller";
import { IDriversController } from "./drivers.controller.interface";
import { inject } from "inversify";
import { TYPES } from "../../types";
import { ILogger } from "../../logger/logger.interface";
import { ValidateMiddleware } from "../../common/validate.middleware";
import { DriverRegisterDto } from "../dto/driver-register.dto";
import { DriverLoginDto } from "../dto/driver-login.dto";
import { IDriversService } from "../services/driver.service.interface";
import { DriverAuthMiddlware } from "../middlewares/driver.auth.middleware";
import { TokenService } from "../../services/token.service";

export class DriversController
  extends BaseController
  implements IDriversController
{
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.DriverService) private driversService: IDriversService,
    @inject(TYPES.TokenService) private tokenService: TokenService
  ) {
    super(loggerService);

    this.bindRoutes([
      {
        path: "/register",
        method: "post",
        func: this.register,
        middlewares: [new ValidateMiddleware(DriverRegisterDto)],
      },
      {
        path: "/login",
        method: "post",
        func: this.login,
        middlewares: [new ValidateMiddleware(DriverLoginDto)],
      },
      {
        path: "/",
        method: "get",
        func: this.getAllDrivers,
        middlewares: [new DriverAuthMiddlware(this.tokenService)],
      },
    ]);
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.driversService.validateDriver(req.body);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.driversService.createDriver(req.body);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async getAllDrivers(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.driversService.getAllDrivers();
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
}
