import { Router } from "express";
import PhoneNumberController from "../controllers/PhoneNumberController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();

router.get("/", [checkJwt], PhoneNumberController.allPhoneNumbers);

export default router;
