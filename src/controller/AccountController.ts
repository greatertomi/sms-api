import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Account } from "../entity/Account";
import { sendHttpError } from "../utils/errorHandler";
import * as jwt from "jsonwebtoken";

export class AccountController {
  private accountRepository = getRepository(Account);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.accountRepository.find();
  }

  async login(request: Request, response: Response, next: NextFunction) {
    const { username, authId } = request.body;
    try {
      const account = await this.accountRepository.findOne({ username });
      if (!account) {
        sendHttpError("Account does not exist", 403);
      }
      if (authId !== account.auth_id) {
        sendHttpError("AuthId incorrect", 403);
      }
      const payload = { id: account.id };
      const token = jwt.sign(payload, "marka", { expiresIn: "10h" });
      console.log(account);
      return { message: "Login successful", token };
    } catch (err) {
      sendHttpError(err, err.statusCode);
    }
  }
}
