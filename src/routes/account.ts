import { Router } from "express";
import AccountController from "../controllers/AccountController";
// import { checkJwt } from "../middlewares/checkJwt";

const router = Router();

router.get("/", AccountController.allAccounts);

router.post("/login", AccountController.login);

export default router;
