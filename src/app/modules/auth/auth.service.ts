import AppError from "../../errorHelpers/Apperror";
import { IUser } from "../user/user.interface"
import { User } from "../user/user.model";
import httpStatus from "http-status-codes"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken";
import { envVars } from "../../config/env";
import { generatetoken } from "../../utils/jwt";



const credentialslogin = async (payload: Partial<IUser>) => {
    const {email ,password} = payload;
    const isuserexist = await User.findOne({email})
    
    if(!isuserexist){
        throw new AppError(httpStatus.BAD_REQUEST, "email does not  exist ")
    }

    const ispasswordmatched = await bcryptjs.compare(password as string , isuserexist.password as string)

    if(!ispasswordmatched) {
        throw new AppError(httpStatus.BAD_REQUEST, "incorrect password")
    }

    // const {password, ...rest} = isuserexist;
    const jwtpayload = {
        userId: isuserexist._id,
        email : isuserexist.email,
        role: isuserexist.role,
    }

    const accesstoken = generatetoken(jwtpayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES)

    // const accesstoken = jwt.sign(jwtpayload, "secret",{
    //     expiresIn: "1d"
    // })

    return {
      accesstoken
    }


}

export const authservices = {
    credentialslogin
}