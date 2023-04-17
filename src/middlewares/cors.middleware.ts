import { NextFunction, Request, Response } from "express";

export function corsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header(
    "Access-Control-Allow-HEADERS",
    "Content-Type, Authorization, X-Requested-With"
  );
  next();
}
