import jwt from "jsonwebtoken";

const secret = "super-secret-123";


type Payload = {
  userId: number;
  email: string;
};

export const createAccessToken = (payload: Payload) => {
  const hour = Math.floor(Date.now() / 1000) + 60 * 60;

  const accessToken = jwt.sign({ exp: hour, payload }, secret);
  return accessToken;
};