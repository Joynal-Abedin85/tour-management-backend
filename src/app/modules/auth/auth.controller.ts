import { Request, Response, NextFunction } from "express"
import {catchasync} from "../../utils/catchasync"
import {sendresponse} from "../../utils/sendresponse"
import httpStatus from "http-status-codes"
import { UserServices } from "../user/user.service"
import { authservices } from "./auth.service"


const credentialslogin = catchasync (async (req: Request, res: Response, next: NextFunction) => {
    
        // const result = await UserServices.getallusers()

        const logininfo = await authservices.credentialslogin(req.body)
        

         sendresponse(res, {
            success: true,
            statuscode: httpStatus.OK,
            message: "user created successfully",
            data: logininfo
        })
   
})

export const authcontroller = {
    credentialslogin
}