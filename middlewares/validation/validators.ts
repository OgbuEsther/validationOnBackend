import { NextFunction } from "express";
import Joi from "joi";
import { AppERROR, HTTPCODES } from "../../utils/AppError";

export const validator = async (
  schemaName: Joi.ObjectSchema,
  body: object,
  next: NextFunction
): Promise<void> => {
  const value = await schemaName.validate(body, {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  });

  try {
    value.error
      ? next(
          new AppERROR({
            httpCode: HTTPCODES.BAD_REQUEST,
            message: value.error.details[0].message,
          })
        )
      : next();
  } catch (error) {
    console.log(error);
  }
};
