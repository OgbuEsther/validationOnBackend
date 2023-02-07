import { Request , Response , NextFunction} from "express";
import { IAuthUser } from "../../interfaces/User";


export const isAdmin = (req: IAuthUser , res:Response , next:NextFunction) =>{
    const user = req.user;
    // if(req.user.role === 'admin'){
    //     next();
    // }else{
    //     res.status(401).json({message: 'You are not authorized to perform this action'});
    // }
}

