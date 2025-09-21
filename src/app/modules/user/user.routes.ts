import { NextFunction, Request, Response, Router } from "express";
import { usercontroller } from "./user.controller";
import { createUserZodSchema } from "./uservalidation";
import {ZodObject} from "zod"
import { validaterequest } from "../../middlewares/validaterequest";



const  router = Router()

router.post("/register" ,validaterequest(createUserZodSchema) ,usercontroller.createuser)
router.get("/all-users" , usercontroller.getallusers)


export const userRoutes = router