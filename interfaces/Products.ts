import mongoose, { Document } from "mongoose";


export interface Iproducts extends Document {
    name : string;
    price : number;
    category : string;
    rating: number;
    productImage : string;
    numberOfReviews : number;
    reviews : {
        user: mongoose.Schema.Types.ObjectId,
        name : string,
        rating: number,
        comment : string
    }[];
}