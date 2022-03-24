import "reflect-metadata";

process.env.NODE_ENV = "test";

import { Connection, ConnectionOptions, createConnection } from "typeorm";
import * as express from "express";
import * as supertest from "supertest";
import { createServer, Server as HttpServer } from "http";
import routes from "../routes";
import * as bodyParser from "body-parser";
require("dotenv").config();

export class TestFactory {
  private _app: express.Application;
  private _connection: Connection;
  private _server: HttpServer;

  private options: ConnectionOptions = {
    type: "postgres",
    host: process.env.TEST_POSTGRES_HOST,
    port: +process.env.TEST_POSTGRES_PORT,
    username: process.env.TEST_POSTGRES_USERNAME,
    password: process.env.TEST_POSTGRES_PASSWORD,
    database: process.env.TEST_POSTGRES_DATABASE,
    synchronize: true,
    entities: ["src/entity/**/*.ts"],
  };

  public get app(): supertest.SuperTest<supertest.Test> {
    return supertest(this._app);
  }

  public async init(): Promise<void> {
    await this.startup();
  }

  public async close(): Promise<void> {
    this._server.close();
    await this._connection.close();
  }

  private async startup(): Promise<void> {
    try {
      this._connection = await createConnection(this.options);
      this._app = express();
      this._app.use(bodyParser.json());
      this._app.use("/", routes);
      this._server = createServer(this._app).listen(3010);
    } catch (err) {
      console.error("testing error", err);
    }
  }
}
