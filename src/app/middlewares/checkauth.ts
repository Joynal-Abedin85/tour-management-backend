import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/Apperror";
import { verifytoken } from "../utils/jwt";
import { envVars } from "../config/env";
import { Role } from "../modules/user/user.interface";
import { JwtPayload } from "jsonwebtoken";


export const checkAuth = (...authroles: string[]) => async (req: Request, res: Response, next: NextFunction)=>{
 
    try{
        const accesstoken = req.headers.authorization;

        if(!accesstoken){
            throw new AppError(403, "no token error")
        }

        const verifiedtoken =  verifytoken(accesstoken, envVars.JWT_ACCESS_SECRET) as JwtPayload

        if(!authroles.includes(verifiedtoken.role)){
            throw new AppError(403, "you are not authorized ")
        }
        

        

        next()
    } catch (error){
        next(error)
    }

}