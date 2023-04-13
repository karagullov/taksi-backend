import { inject, injectable } from "inversify";
import { DriverLoginDto } from "../dto/driver-login.dto";
import { DriverRegisterDto } from "../dto/driver-register.dto";
import { IDriversService } from "./driver.service.interface";
import { TYPES } from "../../types";
import { IConfigService } from "../../config/config.service.interface";
import { DriverModel } from "../models/Driver";
import bcrypt from "bcryptjs";
import { Driver } from "../entity/driver.entity";
const jwt = require("jsonwebtoken");

@injectable()
export class DriversService implements IDriversService {
  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService
  ) {}

  async createDriver(dto: DriverRegisterDto) {
    const candidate = await DriverModel.findOne({ phone: dto.phone });
    if (candidate) {
      return new Error(`Driver with phone ${candidate.phone} already exists`);
    }

    const salt = await bcrypt.genSalt(+this.configService.get("SALT"));
    const hashPassword = await bcrypt.hash(dto.password, salt);
    const driver = new DriverModel({ ...dto, password: hashPassword });
    await driver.save();

    return driver as any;
  }

  async validateDriver(dto: DriverLoginDto) {
    const driver = await DriverModel.findOne({ phone: dto.phone });
    if (!driver) {
      return new Error(`Invalid phone or password`);
    }
    const isPassValid = await bcrypt.compare(dto.password, driver.password);
    if (!isPassValid) {
      return new Error(`Invalid phone or password`);
    }

    const token = jwt.sign(
      { id: driver.id },
      this.configService.get("jwtSecretKey").{
        expiresIn: '120000'
      }
    );
    return false;
  }
}
