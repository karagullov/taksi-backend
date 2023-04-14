import { IsEnum, IsString } from "class-validator";

enum Cities {
  "Джалал-Абад",
  "Ош",
  "Баткен",
  "Нарын",
  "Талас",
  "Ыссык-кол",
  "Бишкек",
}

export class DriverRegisterDto {
  @IsString({ message: "No phone number specified" })
  phone: string;

  @IsString({ message: "No name specified" })
  name: string;

  @IsString({ message: "No password specified" })
  password: string;

  @IsString({ message: "No car specified" })
  car: string;

  // @IsEnum(Cities)
  cities: string[];

  avatar?: string;
}
