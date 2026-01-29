import jwt from "jsonwebtoken";

export interface Payload extends jwt.JwtPayload {
  id: string;
  email: string;
}
