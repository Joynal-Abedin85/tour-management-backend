import { NextFunction, Request, Response, Router } from "express";
import { usercontroller } from "./user.controller";
import { createUserZodSchema } from "./uservalidation";
import {ZodObject} from "zod"
import { validaterequest } from "../../middlewares/validaterequest";
import  jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/Apperror";
import { Role } from "./user.interface";



const  router = Router()

router.post("/register" ,validaterequest(createUserZodSchema),usercontroller.createuser)
router.get("/all-users" , (req: Request, res: Response, next: NextFunction)=>{
 
    try{
        const accesstoken = req.headers.authorization;

        if(!accesstoken){
            throw new AppError(403, "no token error")
        }

        const verifiedtoken = jwt.verify(accesstoken, "secret")

        if(!verifiedtoken){
            throw new AppError(403, "you are not authorized ")
        }
        

        if((verifiedtoken as JwtPayload).Role !== Role.ADMIN|| Role.SUPER_ADMIN){
            throw new AppError(403, "you are not permitted for view this routes")
        }

        console.log(verifiedtoken)
        next()
    } catch (error){
        next(error)
    }

} , usercontroller.getallusers)


export const userRoutes = router