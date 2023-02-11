import jwt, { JwtPayload, Secret, VerifyErrors } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AppERROR, HTTPCODES } from "../../utils/AppError";

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
