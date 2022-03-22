import { promisify } from "util";
import client from "../config/redis";

const scanAsync = promisify(client.scan).bind(client);

export const getCacheWithPattern = async (pattern) => {
  const found = [];
  let cursor = "0";
  do {
    const reply = await scanAsync(cursor, "MATCH", pattern);
    [cursor] = reply;
    found.push(...reply[1]);
  } while (cursor !== "0");
  return found;
};
