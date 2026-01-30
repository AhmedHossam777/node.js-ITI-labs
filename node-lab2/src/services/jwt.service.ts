import jwt from "jsonwebtoken";
import { Payload } from "../types/auth.types";
import { env } from "../config/env";

class JwtService {
  generateAccessToken = (payload: Payload): string => {
    try {
      return jwt.sign(payload, env.ACCESS_TOKEN.secret, {
        expiresIn: env.ACCESS_TOKEN.lifetime,
      });
    } catch (error: any) {
      throw new Error(`Failed to generate access token: ${error.message}`);
    }
  };

  generateRefreshToken = (payload: Payload): string => {
    try {
      return jwt.sign(payload, env.REFRESH_TOKEN.secret, {
        expiresIn: env.REFRESH_TOKEN.lifetime,
      });
    } catch (error: any) {
      throw new Error(`Failed to generate refresh token: ${error.message}`);
    }
  };

  verifyAccessToken = (token: string): Payload => {
    try {
      return jwt.verify(token, env.ACCESS_TOKEN.secret) as Payload;
    } catch (error: any) {
      throw new Error(`Failed to verify access token: ${error.message}`);
    }
  };

  verifyRefreshToken = (token: string): Payload => {
    try {
      return jwt.verify(token, env.REFRESH_TOKEN.secret) as Payload;
    } catch (error: any) {
      throw new Error(`Failed to verify refresh token: ${error.message}`);
    }
  };
}

export default new JwtService();
