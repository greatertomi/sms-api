import { NextFunction, Request, Response } from "express";

export const throwError = (err) => {
  throw err;
};

export const getWrongRouteErr = (req: Request, res: Response) =>
  res.status(404).send({
    error: `This route does not exist: [${req.method}] ${req.url}`,
  });

export const acceptOnlyPostRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.method !== "POST") {
    return res.status(405).send({ error: "This api only accept POST request" });
  }
  next();
};
