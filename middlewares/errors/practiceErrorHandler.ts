import { Request, Response, NextFunction } from "express";

import { AppERROR, HTTPCODES } from "../../utils/AppError";

export const devErrorHandler = (err: AppERROR, res: Response) => {
  return res.status(HTTPCODES.INTERNAL_SERVER_ERROR).json({
    error: err,
    name: err.name,
    message: err.message,
    stack: err.stack,
    httpCode: err.httpCode,
  });
};

export const ErrorHandler = (
  err: AppERROR,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  devErrorHandler(err, res);
};
