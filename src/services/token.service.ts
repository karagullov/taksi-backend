import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { IConfigService } from "../config/config.service.interface";
import { TokenModel } from "../models/token.model";
const jwt = require("jsonwebtoken");

@injectable()
export class TokenService {
  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService
  ) {}

  generateTokens(phone: string, id: string) {
    const access = jwt.sign(
      { phone, id },
      this.configService.get("JWT_ACCESS_SECRET"),
      {
        expiresIn: "30m",
      }
    );
    const refresh = jwt.sign(
      { phone, id },
      this.configService.get("JWT_REFRESH_SECRET"),
      {
        expiresIn: "30d",
      }
    );
    return {
      access,
      refresh,
    };
  }

  async saveToken(driverId: string, refreshToken: string) {
    const tokenData = await TokenModel.findOne({ driver: driverId });
    if (!tokenData) {
      const newTokenData = await TokenModel.create({
        driver: driverId,
        refreshToken,
      });
      return newTokenData;
    }

    tokenData.refreshToken = refreshToken;
    return tokenData.save();
  }

  validateAccessToken(accessToken: string) {
    try {
      const data = jwt.verify(
        accessToken,
        this.configService.get("JWT_ACCESS_SECRET")
      );
      return data;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(refreshToken: string) {
    try {
      const data = jwt.verify(
        refreshToken,
        this.configService.get("JWT_REFRESH_SECRET")
      );
      return data;
    } catch (e) {
      return null;
    }
  }
}
