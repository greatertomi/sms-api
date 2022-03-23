import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import validationChecker from "../middlewares/validators";
import { validateSms } from "../middlewares/validators/sms";
import OutboundController from "../controllers/OutboundController";

const router = Router();

router.post(
  "/sms",
  [checkJwt, ...validateSms, validationChecker],
  OutboundController.sendSms
);

export default router;
