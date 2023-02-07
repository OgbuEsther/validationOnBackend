import express,{ Application, NextFunction , Request , Response } from "express";
import cors from "cors"
import morgan from "morgan";
import { AppERROR, HTTPCODES } from "../utils/AppError";
import { ErrorHandler } from "../middlewares/errors/errorHandler";
import router from "../routes/productRoutes";
import productRouter from "../routes/productRoutes";



export const appConfig =(app:Application) =>{
app.use(express.json()).use(cors()).use(morgan("dev"));



//catch wrong routes

// app.all("*" , (req:Request , res:Response , next:NextFunction) =>{
//     next(
//         new AppERROR ({
//             message : `this route ${req.originalUrl} does not exist `,
//             httpCode : HTTPCODES.NOT_FOUND
//         })
//     )
// });
app.use("/api/product" , productRouter)
app.use(ErrorHandler)

}