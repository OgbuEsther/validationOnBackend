import mongoose from "mongoose";
import { env } from "process";
import dotenv from "dotenv"
import { envVariable } from "./enviornmentVariables";

const URI = envVariable.DB_URI



export const dbConfig = async():Promise<void> =>{
    try {
       const connect = await mongoose.connect(URI)
       console.log(`db is connected to port ${connect.connection.host}`)
    } catch (error) {
        console.log(`unable to connect to database `)
    }
}