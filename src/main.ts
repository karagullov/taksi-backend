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
import { IUserService } from "./users/user.service.interface";
import { UserService } from "./users/user.service";
import { IConfigService } from "./config/config.service.interface";
import { ConfigService } from "./config/config.service";
import { IDriversController } from "./drivers/controllers/drivers.controller.interface";
import { DriversController } from "./drivers/controllers/drivers.controller";
import { IDriversService } from "./drivers/services/driver.service.interface";
import { DriversService } from "./drivers/services/driver.service";
import { TokenService } from "./services/token.service";

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
  bind<TokenService>(TYPES.TokenService).to(TokenService).inSingletonScope();
  bind<IUsersController>(TYPES.UsersController).to(UsersController);
  bind<IDriversController>(TYPES.DriversController).to(DriversController);
  bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
  bind<IUserService>(TYPES.UserService).to(UserService);
  bind<IDriversService>(TYPES.DriverService).to(DriversService);
  bind<IConfigService>(TYPES.ConfigService)
    .to(ConfigService)
    .inSingletonScope();
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
