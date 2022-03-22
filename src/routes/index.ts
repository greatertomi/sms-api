import { Router, Request, Response } from "express";
import account from "./account";
import phoneNumber from "./phoneNumber";

const routes = Router();

routes.use("/accounts", account);

routes.use("/phoneNumbers", phoneNumber);

export default routes;
