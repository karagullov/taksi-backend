import { DriverLoginDto } from "../dto/driver-login.dto";
import { DriverRegisterDto } from "../dto/driver-register.dto";
import { Driver } from "../entity/driver.entity";

export interface IDriversService {
  createDriver: (dto: DriverRegisterDto) => Promise<Error | Driver>;
  validateDriver: (dto: DriverLoginDto) => Promise<Error | Driver>;
}
