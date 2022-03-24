import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import routes from "./routes";
import { acceptOnlyPostRequest, getWrongRouteErr } from "./utils/helpers";
import { NextFunction, Request, Response } from "express";
require("dotenv").config();

const main = async () => {
  try {
    await createConnection();
    const app = express();

    app.use(cors());
    app.use(bodyParser.json());

    app.use((req: Request, res: Response, next: NextFunction) =>
      acceptOnlyPostRequest(req, res, next)
    );
    app.use("/", routes);

    app.use((req: Request, res: Response) => getWrongRouteErr(req, res));

    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

main();
