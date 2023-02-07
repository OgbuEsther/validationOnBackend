
import bcrypt from "bcrypt"
import { Request  , Response , NextFunction} from "express";
import { Iuser } from "../interfaces/User";
import { AppERROR , HTTPCODES ,  } from "../utils/AppError";
import {asyncHandler} from "../utils/AsyncHandler"
import userModel from "../model/user.model";
import { generateToken } from "../middlewares/JWT/user.auth";


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

export const LoginUsers = asyncHandler(
    async(req: Request, res: Response, next: NextFunction): Promise<Response> =>{
        const {email, password} = req.body;

        if (!email) {
            next(
                new AppERROR({
                    message: "Please enter an email",
                    httpCode: HTTPCODES.NOT_FOUND,
                    name: AppERROR.name
                })
            )
        }
        if (!password) {
            next(
                new AppERROR({
                    message: "Please fill in all fields",
                    httpCode: HTTPCODES.NOT_FOUND,
                    name: AppERROR.name
                })
            )
        }

        const user = await userModel.findOne({email});
        if (!user) {
            next(
                new AppERROR({
                    message: "User does not exist, please sign up",
                    httpCode: HTTPCODES.NOT_FOUND,
                    name: AppERROR.name
                })
            )
        };

        const checkPassword = await bcrypt.compare(password, user!.password);

        if (!checkPassword) {
            next(
                new AppERROR({
                    message: "Either Email or Password not correct",
                    name: AppERROR.name,
                    isOperational: true,
                    httpCode: HTTPCODES.UNAUTHORIZED
                })
            )
        }
        const token = generateToken({_id : user!._id,
            email: user!.email})

        return res.status(HTTPCODES.OK).json({
            message: `User login successful`,
            data: `Welcome ${user?.name}`,
            token
        })
    }
)

export const getAll = asyncHandler(
    async(req:Request, res:Response , next :NextFunction) => {
        const users = await userModel.find();
        if(!users){
            next (
                new AppERROR({
                    message : "unable to get users",
                    httpCode : HTTPCODES.BAD_REQUEST,
                    name : AppERROR.name,
        })
        )
        }

        return res.status(HTTPCODES.OK).json({
            message : "users fetched successfully",
            data : users
    })

}
)
