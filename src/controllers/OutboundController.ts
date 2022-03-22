import { Request, Response } from "express";
import { getCacheWithPattern } from "../utils/cacheUtils";
import { getRepository } from "typeorm";
import { PhoneNumber } from "../entity/PhoneNumber";
import redis from "../config/redis";

class OutboundController {
  static sendSms = async (req: Request, res: Response) => {
    const { to, from, text } = req.body;
    const timestamp = +new Date();
    const HOURS_24 = 86400;
    try {
      const cacheData = await getCacheWithPattern(`number${to}${from}-*`);

      const phoneNumberRepository = getRepository(PhoneNumber);
      const fromNumber = await phoneNumberRepository.findOne({ number: from });
      if (!fromNumber) {
        return res
          .status(400)
          .send({ message: "", error: "from parameter not found" });
      }

      if (cacheData.length > 0) {
        return res.status(400).send({
          message: "",
          error: `sms from ${from} to ${to} blocked by STOP request`,
        });
      }

      redis.setex(`sender${from}-${timestamp}`, HOURS_24, "sent");
      const cacheSenderNumbers = await getCacheWithPattern(`sender${from}`);

      if (cacheSenderNumbers.length >= 50) {
        return res
          .status(400)
          .send({ message: "", error: `Limit reached for from ${from}` });
      }

      res.send({ message: "outbound sms ok", error: "" });
    } catch (err) {
      res.status(500).send({ error: "Unknown failure", message: "" });
    }
  };
}

export default OutboundController;
