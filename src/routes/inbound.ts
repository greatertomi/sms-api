import { Router } from "express";
import InboundController from "../controllers/InboundController";
import { checkJwt } from "../middlewares/checkJwt";
import validationChecker from "../middlewares/validators";
import { validateSms } from "../middlewares/validators/sms";

const router = Router();

router.post(
  "/sms",
  [checkJwt, ...validateSms, validationChecker],
  InboundController.sendSms
);

export default router;
