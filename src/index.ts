import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import { env } from "process";
import { envVariable } from "../config/enviornmentVariables";
import { appConfig } from "./app";
import { dbConfig } from "../config/db";
dotenv.config();

const Port = envVariable.PORT;

const app: Application = express();
appConfig(app);
dbConfig();

// app.get("/", (req: Request, res: Response) => {
//   return res.status(200).send("server is up and running");
// });

app.listen(Port, () => {
  console.log(`server is up on port ${Port}`);
});
