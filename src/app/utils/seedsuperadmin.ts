import { envVars } from "../config/env"
import { Iauth, IUser, Role } from "../modules/user/user.interface"
import { User } from "../modules/user/user.model"
import bcryptjs from "bcryptjs"

export const seedsuperadmin = async () => {
    try {
        const issuperadminexist = await User.findOne({email: envVars.SUPER_ADMIN_EMAIL})

        if(issuperadminexist){
            console.log("already ace")
            return
        }

        const hashpassword = await bcryptjs.hash(envVars.SUPER_ADMIN_PASS,Number(envVars.BCRYPT_SALT_ROUND))

        const authProvider: Iauth = {
            provider: "credentials",
            providerId: envVars.SUPER_ADMIN_EMAIL
        }

        const payload: IUser = {
            name: "super admin ",
            role: Role.SUPER_ADMIN,
            email: envVars.SUPER_ADMIN_EMAIL,
            password: hashpassword,
            isVerified: true,
            auths: [authProvider]

        }

        const superadmin = await User.create(payload)

        console.log(superadmin)
    } catch (error){
        console.log(error)
    }
}