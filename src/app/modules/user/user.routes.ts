import { Router } from "express";
import { usercontroller } from "./user.controller";

const  router = Router()

router.post("/register" , usercontroller.createuser)

export const userRoutes = router