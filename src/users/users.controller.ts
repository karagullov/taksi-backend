import { NextFunction, Request, Response, Router } from "express";
import { BaseController } from "../common/base.controller";
import { inject } from "inversify";
import { TYPES } from "../types";
import { ILogger } from "../logger/logger.interface";
import { injectable } from "inversify";
import { IUsersController } from "./users.controller.interface";
import { HTTPError } from "../errors/http-error";
import { UserLoginDto } from "./dto/user-login.dto";
import { UserReqisterDto } from "./dto/user-register.dto";
import { IUserService } from "./user.service.interface";

@injectable()
export class UsersController
  extends BaseController
  implements IUsersController
{
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.UserService) private userService: IUserService
  ) {
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

  async login(
    { body }: Request<{}, {}, UserLoginDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    console.log("login", body);
    next(new HTTPError(401, "Not authorized"));
    // res.status(200).end();
  }

  async register(
    { body }: Request<{}, {}, UserReqisterDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const result = await this.userService.createUser(body);

    if (!result) {
      return next(new HTTPError(422, "Registration failed"));
    }

    this.ok(res, { email: result?.email });
  }

  info({ body }: Request, res: Response, next: NextFunction): void {
    console.log("info", body);
    res.status(200).end();
  }
}
