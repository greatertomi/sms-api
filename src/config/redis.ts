import { createClient } from "redis";
require("dotenv").config();

const REDIS_PORT = process.env.REDIS_PORT;
const REDIS_URL = process.env.REDIS_URL;
const environment = process.env.NODE_ENV || "development";

const client =
  environment === "development"
    ? createClient(REDIS_PORT)
    : createClient({ url: REDIS_URL });

client.on("connect", () => {
  console.log("Redis server connected...");
});

export default client;
