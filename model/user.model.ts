import mongoose, { Document } from "mongoose";
import { ICartItems, Iuser } from "../interfaces/User";
import isEmail from "validator/lib/isEmail";
import { authRoles } from "../constants/user.contants";

interface userData extends Document, Iuser {
  clearCart(): Promise<void>;
  addToCart(productId: string, doDecrease: boolean): Promise<boolean>;
  removeFromCart(productId: string): Promise<void>;
}

interface Userdata extends Document, Iuser {
  clearCart(): Promise<void>;
  addToCart(productId: string, doDecrease: boolean): Promise<boolean>;
  removecart(productID: string): Promise<void>;
}

const userSchema: mongoose.Schema<userData> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide your name"],
    },
    email: {
      type: String,
      required: [true, "please enter your email"],
      lowercase: true,
      trim: true,
      unique: true,
      validate: [isEmail, "please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "please provide your password"],
      minlength: 6,
      alphanum: true,
    },
    confirm: {
      type: String,
      required: [true, "please confirm your password"],
      minlength: 6,
    },
    role: {
      type: String,
      required: [true, "please provide your role"],
      enum: [authRoles.admin, authRoles.manager, authRoles.user],
      message: `please choose one of the following roles: admin, user, manager`,
      default: "user",
    },
    cart: {
      items: [
        {
          productID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: [true, "please select a product"],
          },
          quantity: {
            type: Number,
            required: [true, "please select a quantity"],
          },
        },
      ],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.addToCart = function (
  productId: string,
  doDecrease: boolean
) {
  let cartItemIndex = -1;
  let updateCartItems: ICartItems[] = [];

  if (this.cart.items) {
    cartItemIndex = this.cart.items.findIndex(
      (cb: { productID: { toString: () => string } }) => {
        return cb.productID.toString() === productId.toString();
      }
    );
    updateCartItems = [...this.cart.items];
  }

  let newQuantity = 1;

  if (cartItemIndex >= 0) {
    if (doDecrease) {
      newQuantity = this.cart.items[cartItemIndex].quantity - 1;
      if (newQuantity <= 0) {
        return this.removeFromCart(productId);
      } else {
        newQuantity = this.cart.items[cartItemIndex].quantity + 1;
      }
      updateCartItems[cartItemIndex].qunatity = newQuantity;
    }
  } else {
    updateCartItems.push({
      productID: productId,
      qunatity: newQuantity,
    });
  }

  const updatedCart = {
    items: updateCartItems,
  };

  this.cart.items = updatedCart;
  return this.save({ validateBeforeSave: false });
};

userSchema.methods.removeFromCart = function (productId: string) {
  const updateCart = this.cart.items.filter(
    (item: { productID: { toString: () => string } }) => {
      return item.productID.toString() !== productId.toString();
    }
  );
  this.cart.items = updateCart;
  return this.save({ validateBeforeSave: false });
};

userSchema.methods.removeFromCart = function (productId: string) {
  const updateCart = this.cart.items.filter(
    (item: { productId: { toString: () => string } }) => {}
  );
};

userSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
};

const userModel = mongoose.model<userData>(
  "userDetailsCollections",
  userSchema
);

export default userModel;
