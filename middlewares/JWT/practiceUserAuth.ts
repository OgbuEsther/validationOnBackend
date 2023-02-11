import jwt, { JwtPayload, Secret, VerifyErrors } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AppERROR, HTTPCODES } from "../../utils/AppError";
import userModel from "../../model/user.model";
import { Iuser } from "../../interfaces/User";

interface PayLoad extends JwtPayload {
  _id: string;
  email: string;
}

const secret = "wefwhgdeytkweddaqredstfw";

export const genToken = (user: PayLoad) => {
  return jwt.sign(user, secret as Secret, { expiresIn: "1h" });
};

export const userAuth = (req: Request, res: Response, next: NextFunction) => {
  const headers = req.headers.authorization;
  if (!headers || !headers.startsWith("Bearer ")) {
    next(
      new AppERROR({
        httpCode: HTTPCODES.UNAUTHORIZED,
        message: "you are unauthorised",
      })
    );
  }

  const token: string = headers!.split(" ")[1];

  jwt.verify(
    token,
    secret as Secret,
    async (err: VerifyErrors | null, decodedUser: any) => {
      if (err) {
        const errorMsg =
          err.name === "JsonWebTokenError"
            ? "Invalid token , you are unauthorised"
            : err.message;
      }
    }
  );
};
