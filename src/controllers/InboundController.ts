import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { PhoneNumber } from "../entity/PhoneNumber";
import redis from "../config/redis";

class InboundController {
  static sendSms = async (req: Request, res: Response) => {
    const { to, from, text } = req.body;
    const timestamp = +new Date();
    const searchText = ["STOP", "STOP\\n", "STOP\\r", "STOP\\r\\n"];
    const HOURS_4 = 14400;
    try {
      const phoneNumberRepository = getRepository(PhoneNumber);
      const toNumber = await phoneNumberRepository.findOne({ number: to });
      if (!toNumber) {
        return res
          .status(400)
          .send({ message: "", error: "to parameter not found" });
      }

      if (searchText.includes(text)) {
        redis.setex(
          `number${to}${from}-${timestamp}`,
          HOURS_4,
          JSON.stringify({ from, to })
        );
      }

      res.send({ message: "inbound sms ok", error: "" });
    } catch (err) {
      res.status(500).send({ error: "Unknown failure", message: "" });
    }
  };
}

export default InboundController;
