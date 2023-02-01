import { Document } from "mongoose";


export interface Iproducts extends Document {
    name : string;
    price : number;
    category : string;
    rating: number;
    productImage : string
}