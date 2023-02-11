import jwt, { JwtPayload, Secret, VerifyErrors } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AppERROR, HTTPCODES } from "../../utils/AppError";
import userModel from "../../model/user.model";
import { Iuser } from "../../interfaces/User";

export interface PayLoad extends JwtPayload {
  _id: string;
  email: string;
}

export const secret = "dynamitebysia";

export const generateToken = (user: PayLoad) => {
  jwt.sign(user, secret as Secret, { expiresIn: "1h" });
};

export const userAuth = (req: Request, res: Response, next: NextFunction) => {
  //get token from our headers

  const headers = req.headers.authorization;
  if (!headers || !headers.startsWith("Bearer ")) {
    next(
      new AppERROR({
        message: "you are unauthorized",
        httpCode: HTTPCODES.UNAUTHORIZED,
      })
    );
  }

  const token: string = headers!.split(" ")[1];

  //verify

  jwt.verify(
    token,
    secret as Secret,
    async (err: VerifyErrors | null, decodedUser: any) => {
      if (err) {
        const errorMsg =
          err.name === "JsonWebTokenError"
            ? "Invalid Token , you areb unauthorized"
            : err.message;

        next(
          new AppERROR({
            message: errorMsg,
            httpCode: HTTPCODES.UNAUTHORIZED,
          })
        );
      }

      try {
        const verifiedUser = await userModel.findOne({ _id: decodedUser._id });
        if (!verifiedUser) {
          next(
            new AppERROR({
              message: "you are unauthorized",
              httpCode: HTTPCODES.UNAUTHORIZED,
            })
          );
        }
        req!.user = verifiedUser as Iuser;

        next();
      } catch (error) {
        next(
          new AppERROR({
            message: error,
            httpCode: HTTPCODES.INTERNAL_SERVER_ERROR,
          })
        );
      }
    }
  );
};
