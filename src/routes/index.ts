import { Router } from "express";
import account from "./account";
import inbound from "./inbound";
import outbound from "./outbound";

const routes = Router();

routes.use("/accounts", account);

routes.use("/inbound", inbound);

routes.use("/outbound", outbound);

export default routes;
