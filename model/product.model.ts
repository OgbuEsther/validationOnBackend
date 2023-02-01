import { Document  , model , Schema} from "mongoose";
import { Iproducts } from "../interfaces/Products";


interface productData extends Document , Iproducts{}

const productSchema = new Schema({
name:{
    type : String,
    required : true,

},
price :{
    type : String,
    required : true,
},
productImage : {
    type : String,
    required : true
},
rating : {
    type : Number,
    required  : true
},
category : {
    type : String,
    required : true
}
} , {timestamps : true ,
versionKey : false})

const productModel = model<productData>("ProductDetailsCollections" , productSchema)

export default productModel