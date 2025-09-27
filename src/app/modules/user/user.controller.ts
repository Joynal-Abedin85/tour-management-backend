import { NextFunction, Request, Response } from "express";
import { User } from "./user.model";
import httpStatus from "http-status-codes"
import { UserServices } from "./user.service";
import AppError from "../../errorHelpers/Apperror";
import { catchasync } from "../../utils/catchasync";
import { success } from "zod";
import { sendresponse } from "../../utils/sendresponse";
import { verifytoken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
// import { Promise } from "zod";



// const createuser = async (req: Request, res: Response, next: NextFunction) => {
//     try{
//         // throw new Error("new err fid")
//         // throw new AppError(httpStatus.BAD_REQUEST, "fake rrrr")
//         const user = await UserServices.createuser(req.body)

//         res.status(httpStatus.CREATED).json({
//             message: "user created sucssessfully ",
//             user
//         })
//     } catch (err: any) {
//         console.log(err)
//         next(err)

//     }
// }


const createuser = catchasync(async (req: Request, res: Response, next: NextFunction) => {
        const user = await UserServices.createuser(req.body)

        

        sendresponse(res, {
            success: true,
            statuscode: httpStatus.CREATED,
            message: "user created successfully",
            data: user
        })
})

const updateduser = catchasync(async (req: Request, res: Response, next: NextFunction) => {

        const userId = req.params.id;
        // const token = req.headers.authorization
        // const verifiedtoken = verifytoken(token as string, envVars.JWT_ACCESS_SECRET) as JwtPayload

        const verifiedtoken =  req.user
        const payload = req.body
        const user = await UserServices.updateuser(userId, payload, verifiedtoken)

      
        sendresponse(res, {
            success: true,
            statuscode: httpStatus.CREATED,
            message: "user updated successfully",
            data: user
        })
})

const getallusers = catchasync (async (req: Request, res: Response, next: NextFunction) => {
    
        const result = await UserServices.getallusers()
        

         sendresponse(res, {
            success: true,
            statuscode: httpStatus.CREATED,
            message: "user created successfully",
            data: result.data,
            meta: result.meta
        })
   
})

export const usercontroller = {
    createuser,
    getallusers,
    updateduser
}