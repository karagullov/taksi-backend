import "reflect-metadata";
import { Container, ContainerModule, interfaces } from "inversify";
import { App } from "./app";
import { LoggerService } from "./logger/logger";
import { ILogger } from "./logger/logger.interface";
import { TYPES } from "./types";
import { IUsersController } from "./users/users.controller.interface";
import { UsersController } from "./users/users.controller";
import { IExeptionFilter } from "./errors/exeption.filter.interface";
import { ExeptionFilter } from "./errors/exeption.filter";

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService);
  bind<IUsersController>(TYPES.UsersController).to(UsersController);
  bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
  bind<App>(TYPES.Application).to(App);
});

function bootstrap() {
  const appContainer = new Container();
  appContainer.load(appBindings);

  const app = appContainer.get<App>(TYPES.Application);
  app.init();

  return { app, appContainer };
}

export const { app, appContainer } = bootstrap();
