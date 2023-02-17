import { Iuser } from "./User";
import { Request } from "express";

export interface AuthenticatedBody<T> extends Request {
  body: T;
  user?: Iuser;
}
