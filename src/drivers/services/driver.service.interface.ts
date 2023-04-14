import { DriverLoginDto } from "../dto/driver-login.dto";
import { DriverRegisterDto } from "../dto/driver-register.dto";
import { Driver } from "../entity/driver.entity";

interface DriverData {
  driver: Driver;
  access: string;
  refresh: string;
}

export interface IDriversService {
  createDriver: (dto: DriverRegisterDto) => Promise<DriverData>;
  validateDriver: (dto: DriverLoginDto) => Promise<DriverData>;
  getAllDrivers: () => Promise<Driver[]>;
}
