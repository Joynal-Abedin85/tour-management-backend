import AppError from "../../errorHelpers/Apperror";
import { Iauth, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes"
import bcryptjs from "bcryptjs"
import { envVars } from "../../config/env";
import { decode, JwtPayload } from "jsonwebtoken";

const createuser = async (payload: Partial<IUser>) => {

    const {email ,password, ...rest} = payload;
    const isuserexist = await User.findOne({email})
    
    if(isuserexist){
        throw new AppError(httpStatus.BAD_REQUEST, "user already exist ")
    }

    const hashpassword =await bcryptjs.hash(password as string, Number(envVars.BCRYPT_SALT_ROUND))

    console.log(hashpassword)

    const authProvider: Iauth = {provider: "credentials", providerId: email as string}
    const user = await User.create({
        email,
        password: hashpassword,
        auths: [authProvider],
        ...rest
    })

    return user
}

const updateuser = async (userId: string, payload: Partial<IUser>, decodedtoken: JwtPayload) =>{
     
    const isuserexist = await User.findById(userId)

    if(!isuserexist) {
        throw new AppError(httpStatus.NOT_FOUND, "you are not authorized")
    }
   
    if (payload.role) {
        if ( decodedtoken.role === Role.USER || decodedtoken.role === Role.GUIDE){
            throw new AppError(httpStatus.FORBIDDEN, "you are not authorized")
        }

        if(payload.role === Role.SUPER_ADMIN && decodedtoken.role === Role.ADMIN) {
            throw new AppError(httpStatus.FORBIDDEN, "you are not authorized")

        }
    }

    if ( payload.isActive || payload.isDeleted || payload.isVerified) {
        if(decodedtoken.role === Role.USER || decodedtoken.role === Role.GUIDE) {
            throw new AppError(httpStatus.FORBIDDEN, "you are not authorized")
        }
    }

    if (payload.password) {
        payload.password = await bcryptjs.hash(payload.password, envVars.BCRYPT_SALT_ROUND)
    }

    const newupdateuser = await User.findByIdAndUpdate(userId, payload, {new: true, runValidators: true})

    return newupdateuser
}

const getallusers = async () => {
    const users = await User.find({})
    const totalusers = await User.countDocuments()
    return {
        data: users,
        meta: {
            total: totalusers
        }
    }
}

export const UserServices = {
    createuser,
    getallusers,
    updateuser
}