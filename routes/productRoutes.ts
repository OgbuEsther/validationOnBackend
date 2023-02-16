import express, { Router } from "express";
import { getProducts, createProduct } from "../controller/product.controls";
import { isAdmin } from "../middlewares/JWT/admin.auth";
import { userAuth } from "../middlewares/JWT/user.auth";

const productRouter = Router();

productRouter.route("/postproducts").post( createProduct);
productRouter.route("/getproducts").get(userAuth, getProducts);

export default productRouter;
