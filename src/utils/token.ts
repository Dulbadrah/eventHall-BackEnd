import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "super-secret-123";

type Payload = {
  id: number;
  email: string;
  role?: string;
};

export const createAccessToken = (payload: Payload) => {
  const hour = Math.floor(Date.now() / 1000) + 60 * 60;

  const accessToken = jwt.sign({ exp: hour, payload }, secret);
  return accessToken;
};
