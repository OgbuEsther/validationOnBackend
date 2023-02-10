import { userSchemaValidator } from "./userSchema";
import { validator } from "../validators";

import { Request, Response, NextFunction, RequestHandler } from "express";

export const registerValidation : RequestHandler = (req:Request , res:Response , next:NextFunction) => {
    validator(userSchemaValidator.register , req.body , next)
}

export const loginValidation :RequestHandler =(req:Request , res:Response , next:NextFunction) =>{
    validator(userSchemaValidator.login , req.body , next)
}
