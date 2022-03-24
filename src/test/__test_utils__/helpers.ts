import * as jwt from "jsonwebtoken";
import config from "../../config/config";

export const generateTestJwt = (account) => {
  const payload = { id: account.id, username: account.username };
  return jwt.sign(payload, config.jwtSecret, { expiresIn: "10h" });
};
