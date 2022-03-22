import { sendHttpError } from "../utils/errorHandler";

const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

export default (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    const secret = keys.jwtSecret;

    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    sendHttpError("Authentication Failed!", 403);
  }
};
