import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Account } from "../entity/Account";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

class AccountController {
  static login = async (req: Request, res: Response) => {
    const { username, authId } = req.body;
    const accountRepository = getRepository(Account);
    try {
      const account = await accountRepository.findOne({ username });
      if (!account) {
        return res.status(403).send({ message: "User does not exist" });
      }
      if (authId !== account.auth_id) {
        return res.status(403).send({ message: "Password is incorrect" });
      }

      const payload = { id: account.id, username: account.username };
      const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "10h" });
      return res.send({ message: "Login successful", token });
    } catch (err) {
      return res.status(500).send({ message: "Server Error" });
    }
  };

  static allAccounts = async (req: Request, res: Response) => {
    const accountRepository = getRepository(Account);
    const accounts = await accountRepository.find({
      select: ["id", "username", "auth_id"],
    });
    res.send(accounts);
  };
}

export default AccountController;
