export enum HTTPCODES {
    OK= 200,
    CREATED= 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    CONFLICT = 409,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
}

export interface AppErrorArgs {
    name? : string,
    message : string,
    isOperational? : boolean,
    httpCode : HTTPCODES
}

export class AppERROR extends Error{
    public readonly name : string
    public readonly httpCode : HTTPCODES
    public readonly isOperational : boolean = true
    constructor(args:AppErrorArgs){
        super(args.message)


        Object.setPrototypeOf(this , new.target.prototype)


        this.name = args.name || "Error"
        this.httpCode = args.httpCode

        if(args.isOperational !== undefined){
            this.isOperational = args.isOperational
        }

        Error.captureStackTrace(this)
    }
}

