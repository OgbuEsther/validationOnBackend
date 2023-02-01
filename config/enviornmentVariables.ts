import dotenv from "dotenv"
dotenv.config()
import {env} from "process"

export const envVariable = {
PORT : env.PORT as string,
DB_URI : env.DB_URI as string
}