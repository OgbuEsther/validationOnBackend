import mongoose, { Document } from "mongoose";
import { Iuser } from "./User";

export interface reviewT {
  user: mongoose.Schema.Types.ObjectId;
  name: string;
  rating: number;
  comment: string;
}
export interface Iproducts extends Document {
  name: string;
  price: number;
  category: string;
  rating: number;
  productImage: string;
  numberOfReviews: number;
  reviews: reviewT[];
}

export interface addProductToCart extends Iuser {
  productId: string;
}
