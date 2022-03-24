const { Pool, Client } = require("pg");
const fs = require("fs");

require("dotenv").config();

// Read SQL seed query
seedQuery = fs.readFileSync("db/testSeed.sql", {
  encoding: "utf-8",
});

const credential = {
  host: process.env.TEST_POSTGRES_HOST,
  port: +process.env.TEST_POSTGRES_PORT,
  username: process.env.TEST_POSTGRES_USERNAME,
  password: process.env.TEST_POSTGRES_PASSWORD,
  database: process.env.TEST_POSTGRES_DATABASE,
};

console.log(credential);

const seedTestData = async () => {
  // Connect to database
  const pool = new Pool(credential);
  const now = await pool.query("SELECT NOW()");
  console.log("now", now);
  await pool.end();
};
seedTestData();
