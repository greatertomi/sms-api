import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import routes from "./routes";
import { acceptOnlyPostRequest, getWrongRouteErr } from "./utils/helpers";
require("dotenv").config();

const main = async () => {
  try {
    await createConnection();
    const app = express();

    app.use(cors());
    app.use(bodyParser.json());

    app.use((req, res, next) => acceptOnlyPostRequest(req, res, next));
    app.use("/", routes);

    app.use((req, res) => getWrongRouteErr(req, res));

    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

main();
