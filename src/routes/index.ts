import { Router } from "express";
import account from "./account";
import phoneNumber from "./phoneNumber";
import inbound from "./inbound";

const routes = Router();

routes.use("/accounts", account);

routes.use("/phoneNumbers", phoneNumber);

routes.use("/inbound", inbound);

export default routes;
