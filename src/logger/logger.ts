import { Logger } from "tslog";
import { ILogger } from "./logger.interface";
import { injectable } from "inversify";

@injectable()
export class LoggerService implements ILogger {
  public logger: Logger;

  constructor() {
    this.logger = new Logger();
  }

  public log(...args: unknown[]) {
    this.logger.info(...args);
  }

  public warn(...args: unknown[]) {
    this.logger.warn(...args);
  }

  public error(...args: unknown[]) {
    this.logger.error(...args);
  }
}
