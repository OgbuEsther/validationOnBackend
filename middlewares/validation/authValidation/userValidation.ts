import { userSchemaValidator } from "./userSchema";
import {validator} from "../validators";

import { RequestHandler, NextFunction, Request, Response } from "express";

// Validation middleware functions:

export const registerValidation: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) =>{
    validator(userSchemaValidator.register, req.body, next)
};

export const loginValidation: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) =>{
    validator(userSchemaValidator.login, req.body, next)
};