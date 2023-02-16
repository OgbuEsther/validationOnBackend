import mongoose from "mongoose";
import { Request } from "express";

export interface Iuser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  confirm: string;
  cart?: {
    items: {
      products: mongoose.Schema.Types.ObjectId;
      qunatity: number;
    };
  }[];
  role: string;
}

export interface IAuthUser extends Request {
  user: Iuser;
}

export interface ICartItems {
  productID: string;
  qunatity: number;
}
