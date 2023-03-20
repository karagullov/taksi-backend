import { UserLoginDto } from "./dto/user-login.dto";
import { UserReqisterDto } from "./dto/user-register.dto";
import { User } from "./user.entity";

export interface IUserService {
  createUser: (dto: UserReqisterDto) => Promise<User | null>;
  validateUser: (dto: UserLoginDto) => Promise<boolean>;
}
