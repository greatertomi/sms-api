import "reflect-metadata";
import { Connection, ConnectionOptions, createConnection } from "typeorm";
import * as express from "express";
import * as supertest from "supertest";
import { Server as HttpServer } from "http";
import redis from "../config/redis";
import routes from "../routes";
require("dotenv").config();

export class TestFactory {
  private _app: express.Application;
  private _connection: Connection;
  private _server: HttpServer;

  private options: ConnectionOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "root",
    password: "programmer",
    database: "moneymarka-test",
    synchronize: true,
    entities: ["src/entity/**/*.ts"],
  };

  public get app(): supertest.SuperTest<supertest.Test> {
    return supertest(this._app);
  }

  public get connection(): Connection {
    return this._connection;
  }

  public get server(): HttpServer {
    return this._server;
  }

  public async init(): Promise<void> {
    await this.startup();
  }

  public async close(): Promise<void> {
    this._server.close();
    await this._connection.close();
    redis.disconnect();
  }

  private async startup(): Promise<void> {
    this._connection = await createConnection(this.options);
    this._app = express();
    this._app.use("/", routes);
    const PORT = 3010;
    this._server = this._app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  }
}
