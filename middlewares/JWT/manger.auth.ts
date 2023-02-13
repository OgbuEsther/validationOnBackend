import { Request, Response, NextFunction } from "express";
import { IAuthUser } from "../../interfaces/User";

export const isManager = (
  req: IAuthUser,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role === "manager") {
    next();
  } else {
    res.status(403).json({ message: "You are not a manager" });
  }
};
