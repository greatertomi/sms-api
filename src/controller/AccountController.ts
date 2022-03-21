import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Account} from "../entity/Account";

export class AccountController {

  private accountRepository = getRepository(Account);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.accountRepository.find();
  }
}