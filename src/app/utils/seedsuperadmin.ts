import { envVars } from "../config/env"
import { User } from "../modules/user/user.model"

export const seedsuperadmin = async () => {
    try {
        const issuperadminexist = await User.findOne({email: envVars.SUPER_ADMIN_EMAIL})

        if(issuperadminexist){
            console.log("already ace")
            return
        }

        const payload = {
            name: "super admin "
        }

        const superadmin = await User.create({})
    } catch (error){
        console.log(error)
    }
}