import { IsString } from "class-validator";

export class DriverRegisterDto {
  @IsString({ message: "No phone number specified" })
  phone: string;

  @IsString({ message: "No name specified" })
  name: string;

  @IsString({ message: "No password specified" })
  password: string;

  @IsString({ message: "No car specified" })
  car: string;

  @IsString({ message: "No city1 specified" })
  city1: string;

  @IsString({ message: "No city2 specified" })
  city2: string;

  avatar?: string;
}
