import { inject, injectable } from "inversify";
import { DriverLoginDto } from "../dto/driver-login.dto";
import { DriverRegisterDto } from "../dto/driver-register.dto";
import { IDriversService } from "./driver.service.interface";
import { TYPES } from "../../types";
import { IConfigService } from "../../config/config.service.interface";
import { DriverModel } from "../../models/driver.model";
import bcrypt from "bcryptjs";
import { Driver } from "../entity/driver.entity";
import { TokenService } from "../../services/token.service";
import { HTTPError } from "../../errors/http-error";

@injectable()
export class DriversService implements IDriversService {
  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.TokenService) private tokenService: TokenService
  ) {}

  async createDriver(dto: DriverRegisterDto) {
    const candidate = await DriverModel.findOne({ phone: dto.phone });
    if (candidate) {
      throw new HTTPError(
        400,
        `Driver with phone ${candidate.phone} already exists`
      );
    }

    const salt = await bcrypt.genSalt(+this.configService.get("SALT"));
    const hashPassword = await bcrypt.hash(dto.password, salt);
    const driver = await DriverModel.create({ ...dto, password: hashPassword });

    const driverDto = new Driver(driver as any);
    const tokens = this.tokenService.generateTokens(
      driverDto.phone,
      driverDto.id
    );
    await this.tokenService.saveToken(driverDto.id, tokens.refresh);

    return {
      ...tokens,
      driver: driverDto,
    };
  }

  async validateDriver(dto: DriverLoginDto) {
    const driver = await DriverModel.findOne({ phone: dto.phone });
    if (!driver) {
      throw new HTTPError(400, "Invalid phone or password");
    }

    const isPassValid = await bcrypt.compare(dto.password, driver.password);
    if (!isPassValid) {
      throw new HTTPError(400, "Invalid phone or password");
    }

    const driverDto = new Driver(driver as any);
    const tokens = this.tokenService.generateTokens(
      driverDto.phone,
      driverDto.id
    );
    await this.tokenService.saveToken(driverDto.id, tokens.refresh);

    return {
      ...tokens,
      driver: driverDto,
    };
  }

  async getAllDrivers() {
    const drivers = await DriverModel.find({}, { password: 0, __v: 0 });
    //@ts-ignore
    return drivers as Driver[];
  }
}
