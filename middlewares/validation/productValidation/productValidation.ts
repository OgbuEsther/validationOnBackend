import { productSchemaValidator } from "./productSchema";
import { validator } from "../validators";
import { NextFunction, RequestHandler, Request, Response } from "express";

export const productValidation: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validator(productSchemaValidator.post, req.body, next);
};
