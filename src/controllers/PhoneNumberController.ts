import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { PhoneNumber } from "../entity/PhoneNumber";

class PhoneNumberController {
  static allPhoneNumbers = async (req: Request, res: Response) => {
    const phoneNumberRepository = getRepository(PhoneNumber);
    return phoneNumberRepository.find();
  };
}

export default PhoneNumberController;
