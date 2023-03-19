import { Router } from "express";

export const usersRouter = Router();

usersRouter.use((req, res, next) => {
  console.log("Users Router");
  next();
});

usersRouter.get("/info", (req, res, next) => {
  res.send("login");
});
