import mongoose, { Schema, model, Document } from "mongoose";
import { Iuser } from "../interfaces/User";

export interface Userdata extends Document, Iuser {
  clearCart(): Promise<void>;
  addToCart(productID: string, doDecrease: boolean): Promise<boolean>;
  removeFromCart(productID): Promise<void>;
}
