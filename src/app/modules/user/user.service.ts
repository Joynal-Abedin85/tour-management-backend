import AppError from "../../errorHelpers/Apperror";
import { Iauth, IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes"
import bcryptjs from "bcryptjs"

const createuser = async (payload: Partial<IUser>) => {

    const {email ,password, ...rest} = payload;
    const isuserexist = await User.findOne({email})
    
    if(isuserexist){
        throw new AppError(httpStatus.BAD_REQUEST, "user already exist ")
    }

    const hashpassword =await bcryptjs.hash(password as string, 10)

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
    getallusers
}