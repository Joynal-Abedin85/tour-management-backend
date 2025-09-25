import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";
import { authroutes } from "../modules/auth/auth.route";

export const router = Router()

const moduleRoutes = [
    {
        path : "/user",
        route: userRoutes
    }, 
    {
        path: "/auth",
        route: authroutes
    }
]

moduleRoutes.forEach((route)=> {
    router.use(route.path, route.route)
})