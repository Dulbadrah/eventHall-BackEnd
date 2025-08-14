import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "super-secret-123";

type Payload = {
  id: number;
  email: string;
  role?: string;
};

export const createAccessToken = (payload: Payload) => {
 
  return jwt.sign(payload, secret, { expiresIn: "1h" });
};
