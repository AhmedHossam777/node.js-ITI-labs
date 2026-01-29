import authService from "../services/auth.service";
import { NextFunction, Request, Response } from "express";

class AuthController {
  signup = async (req: Request, res: Response, next: NextFunction) => {
    const { user, accessToken, refreshToken } = await authService.signup(
      req.body,
    );
    res.status(201).json({
      success: true,
      user,
      accessToken,
      refreshToken,
    });
  };
}

export default new AuthController();
