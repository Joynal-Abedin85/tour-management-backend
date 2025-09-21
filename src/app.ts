
import express, { NextFunction, Request, Response } from "express";
// import { userRoutes } from "./app/modules/user/user.routes";
import cors from "cors"
import { router } from "./app/routes";
import { success } from "zod";
import { envVars } from "./app/config/env";
import { globalerrorhandel } from "./app/middlewares/globalerror";
import notfound from "./app/middlewares/notfound";

const app = express();

app.use(express.json())

app.use (cors())
app.use("/api/v1", router)

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "welcome to tour management system backend"
    })
})

app.use(globalerrorhandel)

app.use(notfound)

export default app
