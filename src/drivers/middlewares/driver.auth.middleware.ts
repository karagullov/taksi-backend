import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { TokenService } from "../../services/token.service";
import { NextFunction, Request, Response } from "express";

@injectable()
export class DriverAuthMiddlware {
  constructor(private tokenService: TokenService) {}

  execute(req: Request, res: Response, next: NextFunction): void {
    try {
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader) {
        res.status(401).send({ error: "You are not authorized" });
        return;
      }

      const accessToken = authorizationHeader.split(" ")[1];
      if (!accessToken) {
        res.status(401).send({ error: "You are not authorized" });
        return;
      }

      const driverData = this.tokenService.validateAccessToken(accessToken);
      if (!driverData) {
        res.status(401).send({ error: "You are not authorized" });
        return;
      }

      //@ts-ignore
      req.driver = driverData;
      next();
    } catch (e) {
      res.status(401).send({ error: "You are not authorized" });
    }
  }
}
