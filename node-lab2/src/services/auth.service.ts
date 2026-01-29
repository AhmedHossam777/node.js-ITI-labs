import jwtService from "./jwt.service";
import { userService } from "./user.service";
import { IUserDocument } from "../types/user.types";

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

  login = async () => {};
}

export default new AuthService();
