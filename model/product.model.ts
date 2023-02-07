import { Document  , model , Schema} from "mongoose";
import { category } from "../constants/products.constant";
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
 default : 0
},
category : {
    type : String,
    required : true,
    enum : [category.all , category.books , category.clothing , category.electronics , category.menswear , category.mobile , category.womenswear],
    message : "please select a category",
    default : "all"
},
numberOfReview : {
    type : Number,
    default : 0
},
reviews : [
    {
        user : {
            type : Schema.Types.ObjectId,
            ref : "User",
            required : true
        },
        name : {type : String, required : true},
        rating : {type : Number , required:true},
        comment : {type : String, required: true}
    }
]
} , {timestamps : true ,
versionKey : false})

const productModel = model<productData>("ProductDetailsCollections" , productSchema)

export default productModel