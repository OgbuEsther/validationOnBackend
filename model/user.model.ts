import mongoose from "mongoose";
import { Iuser } from "../interfaces/User";
import isEmail from "validator/lib/isEmail";


interface userData extends Document , Iuser{}

const userSchema: mongoose.Schema<userData> = new mongoose.Schema({
    name: {
        type: String,
        required: [true , "please provide your name"],
    },
    email : {
        type: String,
        required : [true , "please enter your email"],
        lowercase : true,
        trim : true,
        unique : true,
        validate : [isEmail , "please enter a valid email"]
    },
    password :{
        type : String,
        required : [true , "please provide your password"],
        minlength : 6
    },
    confirm : {
        type : String,
        required :[true , "please confirm your password"],
        minlength : 6
    },
    cart:[
        {
            items : {
                products : mongoose.Schema.Types.ObjectId,
                ref :"ProductDetailsCollections"
            },
            quantity : Number
        }
    ]
        
    
}, {versionKey : false ,timestamps : true})


const userModel = mongoose.model<userData>("userDetailsCollections" , userSchema)

export default userModel
