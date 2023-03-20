import { NextFunction, Request, Response, Router } from "express";
import { IMiddleWare } from "./middleware.interface";

export interface IControllerRoute {
  path: string;
  func: (req: Request, res: Response, next: NextFunction) => void;
  method: keyof Pick<Router, "patch" | "put" | "get" | "post" | "delete">;
  middlewares?: IMiddleWare[];
}
