import { NextFunction, Request, Response, Router } from "express";
import { BaseController } from "../common/base.controller";
import { inject } from "inversify";
import { TYPES } from "../types";
import { ILogger } from "../logger/logger.interface";
import { injectable } from "inversify";
import { IUsersController } from "./users.controller.interface";

@injectable()
export class UsersController
  extends BaseController
  implements IUsersController
{
  constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
    super(loggerService);
    this.bindRoutes([
      {
        path: "/login",
        method: "post",
        func: this.login,
      },
      {
        path: "/register",
        method: "post",
        func: this.register,
      },
      {
        path: "/info",
        method: "get",
        func: this.info,
      },
    ]);
  }

  login({ body }: Request, res: Response, next: NextFunction): void {
    console.log("login", body);
    res.status(200).end();
  }

  register({ body }: Request, res: Response, next: NextFunction): void {
    console.log("register", body);
    res.status(200).end();
  }

  info({ body }: Request, res: Response, next: NextFunction): void {
    console.log("info", body);
    res.status(200).end();
  }
}
