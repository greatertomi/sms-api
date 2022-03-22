import { body } from "express-validator";

export const validateSms = [
  body("from")
    .notEmpty()
    .withMessage("from is missing")
    .isLength({ min: 6, max: 16 })
    .withMessage("from length should be between 6 and 16 characters"),
  body("to")
    .notEmpty()
    .withMessage("to is missing")
    .isLength({ min: 6, max: 16 })
    .withMessage("to length should be between 6 and 16 characters"),
  body("text").isLength({ min: 1, max: 120 }),
];
