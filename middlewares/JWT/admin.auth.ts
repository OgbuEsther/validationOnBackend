import { Request , Response , NextFunction} from "express";


export const isAdmin = (req: Request , res:Response , next:NextFunction) =>{
    if(req.user.role === 'admin'){
        next();
    }else{
        res.status(401).json({message: 'You are not authorized to perform this action'});
    }
}

