import { Response } from "express";

interface Tmeta {
    total: number
}

interface Tresponse<T> {
    statuscode: number;
    success: boolean;
    message: string;
    data: T;
    meta?: Tmeta
}
export const sendresponse = <T>(res: Response, data: Tresponse<T>) => {
    res.status(data.statuscode).json({
        statuscode: data.statuscode,
        success: data.success,
        message: data.message,
        meta: data.meta,
        data: data.data
    })
}