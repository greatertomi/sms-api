import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {PhoneNumber} from "../entity/PhoneNumber";

export class PhoneNumberController {

  private phoneNumberRepository = getRepository(PhoneNumber);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.phoneNumberRepository.find();
  }
}