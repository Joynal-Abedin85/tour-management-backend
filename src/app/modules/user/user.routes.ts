import { NextFunction, Request, Response, Router } from "express";
import { usercontroller } from "./user.controller";
import { createUserZodSchema } from "./uservalidation";
import {ZodObject} from "zod"
import { validaterequest } from "../../middlewares/validaterequest";
import  jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/Apperror";
import { Role } from "./user.interface";
import { envVars } from "../../config/env";
import { verifytoken } from "../../utils/jwt";
import { checkAuth } from "../../middlewares/checkauth";



const  router = Router()



router.post("/register" ,validaterequest(createUserZodSchema),usercontroller.createuser)
router.get("/all-users" ,checkAuth(Role.ADMIN, Role.SUPER_ADMIN) , usercontroller.getallusers)


export const userRoutes = router