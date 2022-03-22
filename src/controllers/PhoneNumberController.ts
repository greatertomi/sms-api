import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { PhoneNumber } from "../entity/PhoneNumber";

class PhoneNumberController {
  static allPhoneNumbers = async (req: Request, res: Response) => {
    const phoneNumberRepository = getRepository(PhoneNumber);
    const phoneNumbers = await phoneNumberRepository.find();
    res.send(phoneNumbers);
  };
}

export default PhoneNumberController;
