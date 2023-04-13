import { IsString, Min } from "class-validator";

export class DriverLoginDto {
  @IsString({ message: "No phone number specified" })
  phone: string;

  @IsString({ message: "No password specified" })
  password: string;
}
