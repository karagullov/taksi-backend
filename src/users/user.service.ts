import { UserLoginDto } from "./dto/user-login.dto";
import { UserReqisterDto } from "./dto/user-register.dto";
import { User } from "./user.entity";
import { IUserService } from "./user.service.interface";
import { injectable } from "inversify";

@injectable()
export class UserService implements IUserService {
  async createUser({ email, name, password }: UserReqisterDto) {
    const newUser = new User(email, name);
    await newUser.setPassword(password);
    return null;
  }

  async validateUser({ email, password }: UserLoginDto) {
    return true;
  }
}
