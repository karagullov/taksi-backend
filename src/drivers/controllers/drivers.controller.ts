import { NextFunction, Request, Response } from "express";
import { BaseController } from "../../common/base.controller";
import { IDriversController } from "./drivers.controller.interface";
import { inject } from "inversify";
import { TYPES } from "../../types";
import { ILogger } from "../../logger/logger.interface";
import { ValidateMiddleware } from "../../common/validate.middleware";
import { DriverRegisterDto } from "../dto/driver-register.dto";
import { DriverLoginDto } from "../dto/driver-login.dto";
import { IUserService } from "../../users/user.service.interface";
import { HTTPError } from "../../errors/http-error";
import { IDriversService } from "../services/driver.service.interface";

export class DriversController
  extends BaseController
  implements IDriversController
{
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.DriverService) private driversService: IDriversService
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
    ]);
  }

  login(req: Request, res: Response, next: NextFunction) {
    console.log("login");
    res.status(200);
  }

  async register(req: Request, res: Response, next: NextFunction) {
    const result = await this.driversService.createDriver(req.body);

    if (result instanceof Error) {
      return next(new HTTPError(422, result.message));
    }

    this.ok(res, result);
  }
}
