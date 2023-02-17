import productModel from "../model/product.model";
import express, { Request, Response, NextFunction } from "express";

import { asyncHandler } from "../utils/AsyncHandler";
import { AppERROR, HTTPCODES } from "../utils/AppError";
import { addProductToCart, Iproducts } from "../interfaces/Products";
import { AuthenticatedBody } from "../interfaces/Custom.interface";
import { Iuser } from "../interfaces/User";
import userModel from "../model/user.model";

export const createProduct = asyncHandler(
  async (
    req: Request<{}, {}, Iproducts>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, productImage, price, category } = req.body;
    const product = await productModel.create({
      name,
      productImage,
      price,
      category,
    });
    if (!product) {
      next(
        new AppERROR({
          message: "Product not found",
          httpCode: HTTPCODES.BAD_REQUEST,
        })
      );
    }
    return res.status(201).json({
      message: "Product created successfully",
      data: product,
    });
  }
);

export const getProducts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await productModel.find();

    if (!products) {
      next(
        new AppERROR({
          message: "Product not found",
          httpCode: HTTPCODES.BAD_REQUEST,
        })
      );
    }

    return res.status(200).json({
      message: "Products fetched successfully",
      data: products,
    });
  }
);

export const addToCart = asyncHandler(
  async (
    req: AuthenticatedBody<addProductToCart>,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const user = await userModel.findOne({ email: req!.user!.email });

    if (!user) {
      next(
        new AppERROR({
          message: "User not found",
          httpCode: HTTPCODES.NOT_FOUND,
        })
      );
    }
    const doDecrease = req.query.doDecrease === "true";
    const upDatedUser = await user!.addToCart(req.body.productId, doDecrease);
    const final = {
      user: upDatedUser,
    };

    return res.status(200).json(final);
  }
);
