import { UserLoginDto } from "./dto/user-login.dto";
import { UserReqisterDto } from "./dto/user-register.dto";
import { User } from "./user.entity";
import { IUserService } from "./user.service.interface";
import { injectable, inject } from "inversify";
import { TYPES } from "../types";
import { IConfigService } from "../config/config.service.interface";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService
  ) {}

  async createUser({ email, name, password }: UserReqisterDto) {
    const newUser = new User(email, name);
    const salt = this.configService.get("SALT");
    await newUser.setPassword(password, Number(salt));
    return null;
  }

  async validateUser({ email, password }: UserLoginDto) {
    return true;
  }
}
