import { NextFunction, Request, Response } from "express"
import { envVars } from "../config/env"
import AppError from "../errorHelpers/Apperror"

export const globalerrorhandel = (err: any, req: Request, res: Response, next: NextFunction) =>{

    let statuscode = 500
    let message = `something went wrong fr`

    if (err instanceof AppError) {
        statuscode = err.statuscode
        message = err.message
    } else if (err instanceof Error) {
        statuscode = 400;
        message = err.message
    }

    res.status(500).json({
        success: false,
        message,
        err,
        stack: envVars.NODE_ENV === "development" ? err.stack : null
    })
}