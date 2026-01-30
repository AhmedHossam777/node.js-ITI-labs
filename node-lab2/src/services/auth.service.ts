import jwtService from "./jwt.service";
import { userService } from "./user.service";
import { IUserDocument } from "../types/user.types";
import { LoginDto } from "../types/auth.types";
import { CustomError } from "../utils/customError";

class AuthService {
  signup = async (data: Partial<IUserDocument>) => {
    const user = await userService.create(data);
    const accessToken = jwtService.generateAccessToken({
      email: user.email,
      id: user._id.toString(),
    });
    const refreshToken = jwtService.generateRefreshToken({
      email: user.email,
      id: user._id.toString(),
    });

    return {
      user,
      accessToken,
      refreshToken,
    };
  };

  login = async (data: LoginDto) => {
    const existUser = await userService.getByEmail(data.email);
    if (!existUser) {
      throw new CustomError("invalid email or password", 401);
    }

    const isCorrect = await existUser.comparePassword(data.password);
    if (!isCorrect) {
      throw new CustomError("invalid email or password", 401);
    }
    const accessToken = jwtService.generateAccessToken({
      email: existUser.email,
      id: existUser._id.toString(),
    });
    const refreshToken = jwtService.generateRefreshToken({
      email: existUser.email,
      id: existUser._id.toString(),
    });

    return {
      existUser,
      accessToken,
      refreshToken,
    };
  };
}

export default new AuthService();
