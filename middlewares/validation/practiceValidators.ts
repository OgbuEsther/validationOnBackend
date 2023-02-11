import { NextFunction } from "express";
import Joi from "joi";
import { AppERROR, HTTPCODES } from "../../utils/AppError";

export const validators = async (
  schemaName: Joi.ObjectSchema,
  body: object,
  next: NextFunction
): Promise<void> => {
  const value = await schemaName.validate(body, {
    allowUnknown: true,
    stripUnknown: true,
    abortEarly: false,
  });

  try {
    value.error
      ? next(
          new AppERROR({
            message: value.error.details[0].message,
            httpCode: HTTPCODES.BAD_REQUEST,
          })
        )
      : next();
  } catch (error) {
    console.log(error);
  }
};
