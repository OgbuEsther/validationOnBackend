
import bcrypt from "bcrypt"
import { Request  , Response , NextFunction} from "express";
import { Iuser } from "../interfaces/User";
import { AppERROR , HTTPCODES ,  } from "../utils/AppError";
import {asyncHandler} from "../utils/AsyncHandler"
import userModel from "../model/user.model";


//register

export const register =  asyncHandler(
    async(req:Request<{} , {} ,Iuser > , res :Response , next : NextFunction):Promise<Response> =>{
        const {name , email , password , confirm} = req.body

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password , salt)

        const user = await userModel.create({
            name , email , password:hashedPassword , confirm
        })
        if(!user){
            next (
                new AppERROR({
                    message : "unable to post user",
                    httpCode : HTTPCODES.BAD_REQUEST,
                    name : AppERROR.name,
                    isOperational : true
                })
            )
        }

        return res.status(201).json({
            message : "created successfully",
            data : user
        })
    }
)