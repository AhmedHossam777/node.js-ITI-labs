import jwt from "jsonwebtoken";
import { Payload } from "../types/jwt.types";
import { env } from "../config/env";

class JwtService {
  generateAccessToken = async (payload: Payload) => {
    try {
      return jwt.sign(payload, env.ACCESS_TOKEN.secret, {
        expiresIn: env.ACCESS_TOKEN.lifetime,
      });
    } catch (error: any) {
      throw new Error(`Failed to generate access token: ${error.message}`);
    }
  };

  generateRefreshToken = async (payload: Payload) => {
    try {
      return jwt.sign(payload, env.REFRESH_TOKEN.secret, {
        expiresIn: env.REFRESH_TOKEN.lifetime,
      });
    } catch (error: any) {
      throw new Error(`Failed to generate refresh token: ${error.message}`);
    }
  };

  verifyAccessToken = async (token: string) => {
    try {
      return jwt.verify(token, env.ACCESS_TOKEN.secret);
    } catch (error: any) {
      throw new Error(`Failed to verify access token: ${error.message}`);
    }
  };

  verifyRefreshToken = async (token: string) => {
    try {
      return jwt.verify(token, env.REFRESH_TOKEN.secret);
    } catch (error: any) {
      throw new Error(`Failed to verify refresh token: ${error.message}`);
    }
  };
}

export default new JwtService();
