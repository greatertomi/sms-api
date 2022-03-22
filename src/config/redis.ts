import { createClient } from "redis";
require("dotenv").config();

const REDIS_PORT = process.env.REDIS_PORT;

const client = createClient(REDIS_PORT);

client.on("connect", () => {
  console.log("Redis server connected...");
});

export default client;
