import { NextFunction, Request, Response } from "express";

export interface IDriversController {
  login: (req: Request, res: Response, next: NextFunction) => void;
  register: (req: Request, res: Response, next: NextFunction) => void;
  getAllDrivers: (req: Request, res: Response, next: NextFunction) => void;
}
