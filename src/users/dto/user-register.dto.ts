import { IsEmail, IsString } from "class-validator";

export class UserReqisterDto {
  @IsEmail({}, { message: "Wrong email" })
  email: string;

  @IsString({ message: "No name specified" })
  name: string;

  @IsString({ message: "No password specified" })
  password: string;
}
