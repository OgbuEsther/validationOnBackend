import { Router } from "express";
import { LoginUsers, register, getAll } from "../controller/user.controls";
import { userAuth } from "../middlewares/JWT/user.auth";

import {
  registerValidation,
  loginValidation,
} from "../middlewares/validation/authValidation/userValidation";
const router = Router();

router.route("/register").post(registerValidation, register);

router.route("/login").post(loginValidation, LoginUsers);

router.route("/").get(userAuth, getAll);

export default router;
