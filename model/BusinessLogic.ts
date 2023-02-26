import mongoose, { Schema, model, Document } from "mongoose";
import { Iuser } from "../interfaces/User";
import { userSchema } from "./user.model";

export interface Userdata extends Document, Iuser {
  clearCart(): Promise<void>;
  addToCart(productID: string, doDecrease: boolean): Promise<boolean>;
  removeFromCart(productID): Promise<void>;
}

// userSchema.methods.addToCart = function(productID: string , doDecrease:boolean)

userSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
};
