import { Request , Response , NextFunction } from "express";
import { AppERROR , HTTPCODES } from "../../utils/AppError";

export const devErrorHandler = (err:AppERROR , res:Response)=>{
    return res.status(HTTPCODES.INTERNAL_SERVER_ERROR).json({
        error: err ,
        name : AppERROR.name,
        httpCode : err.httpCode,
        message : err.message,
        stack : err.stack
        
    })
}


export const ErrorHandler = (err:AppERROR,req:Request , res:Response , next:NextFunction)=>{
    devErrorHandler(err , res)
}