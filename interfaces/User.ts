import mongoose from "mongoose";

export interface Iuser extends mongoose.Document{
    name : string,
    email : string,
    password : string,
    confirm : string
    cart? :{
        items : {
            products : mongoose.Schema.Types.ObjectId,
  qunatity : number
        },
      
    }[];
    role : string;
    
}