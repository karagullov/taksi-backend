import { IExeptionFilter } from "./exeption.filter.interface";
import { NextFunction, Request, Response } from "express";
import { inject } from "inversify";
import { TYPES } from "../types";
import { ILogger } from "../logger/logger.interface";
import { HTTPError } from "./http-error";
import { injectable } from "inversify";

@injectable()
export class ExeptionFilter implements IExeptionFilter {
  constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

  catch(
    err: Error | HTTPError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (err instanceof HTTPError) {
      this.logger.error(`Error ${err.statusCode} ${err.message}`);
      res.status(err.statusCode).send({ err: err.message });
    } else {
      this.logger.error(`${err.message}`);
      res.status(500).send({ err: err.message });
    }
  }
}
