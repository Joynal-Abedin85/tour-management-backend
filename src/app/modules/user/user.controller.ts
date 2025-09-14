import { Request, Response } from "express";
import { User } from "./user.model";
import httpStatus from "http-status-codes"

const createuser = async (req: Request, res: Response) => {
    try{
        const {name , email} = req.body ;
        const user = await User.create({
            name,
            email,
        })
        res.status(httpStatus.CREATED).json({
            message: "user created sucssessfully ",
            user
        })
    } catch (err: any) {
        console.log(err)
        res.status(httpStatus.BAD_REQUEST).json({
            message: `something went wrong ${err.mesgae}`,
            err
        })

    }
}

export const usercontroller = {
    createuser
}