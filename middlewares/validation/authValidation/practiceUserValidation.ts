import { NextFunction, RequestHandler, Request, Response } from "express";
import { userSchema } from "./practiceUserSchema";
import { validators } from "../practiceValidators";

export const registerValidation: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validators(userSchema.register, req.body, next);
};

export const loginValidation: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validators(userSchema.login, req.body, next);
};
