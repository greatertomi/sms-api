import { createClient } from "redis";

// todo: Move this to an environment variable
const REDIS_PORT = 6379;

const client = createClient(REDIS_PORT);

client.on("connect", () => {
  console.log("Redis server connected...");
});

export default client;
