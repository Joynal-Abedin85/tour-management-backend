import { NextFunction, Request, Response } from "express"

type asynchandler = (req: Request, res: Response, next: NextFunction) => Promise<void>

export const catchasync = (fn: asynchandler) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req,res,next)).catch((err: any) => {
        console.log(err)
        next(err)
    })
}