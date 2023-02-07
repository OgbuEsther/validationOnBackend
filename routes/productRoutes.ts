import express, { Router } from "express";
import { getProducts, createProduct } from "../controller/product.controls";

const productRouter = Router();

productRouter.route("/postproducts").post(createProduct);
productRouter.route("/getproducts").get(getProducts);

export default productRouter