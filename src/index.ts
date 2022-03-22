import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import routes from "./routes";

createConnection()
  .then(async (connection) => {
    const app = express();

    app.use(cors());
    app.use(bodyParser.json());

    app.use("/", routes);

    // todo: Move this to an environment variable
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
