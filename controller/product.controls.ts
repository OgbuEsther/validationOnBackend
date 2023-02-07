import productModel from "../model/product.model";
import express , {Request , Response , NextFunction} from "express"

import { asyncHandler } from "../utils/AsyncHandler";
import { AppERROR , HTTPCODES } from "../utils/AppError";
import { Iproducts } from "../interfaces/Products";




export const createProduct = asyncHandler(
    async(req:Request<{} , {} , Iproducts> , res : Response , next : NextFunction) => {
const {name , productImage , price , category} = req.body;
const product = await productModel.create({name, productImage, price, category});
if(!product){
    next(new AppERROR ({
        message : "Product not found",
        httpCode : HTTPCODES.BAD_REQUEST
    }))
}
return res.status(201).json({
    message : "Product created successfully",
    data : product
}) 


    })
