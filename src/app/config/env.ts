import { SrvRecord } from "dns"
import dotenv from "dotenv"

dotenv.config()

interface Envconfig {
    PORT: string,
    DB_URL: string,
    NODE_ENV: "development" | "production"
    BCRYPT_SALT_ROUND : string
    JWT_ACCESS_EXPIRES: string
    JWT_ACCESS_SECRET:string
    JWT_REFRESH_SECRET: string
    JWT_REFRESH_EXPIRED: string
    SUPER_ADMIN_EMAIL: string
    SUPER_ADMIN_PASS: string

}

const loadEnvVariables = () : Envconfig => {
    const requiredEnvVariables : string[] = ["PORT", "DB_URL", "NODE_ENV" ,"BCRYPT_SALT_ROUND", "JWT_ACCESS_EXPIRES","JWT_ACCESS_SECRET","SUPER_ADMIN_EMAIL", "SUPER_ADMIN_PASS","JWT_REFRESH_EXPIRED","JWT_REFRESH_SECRET"]

    requiredEnvVariables.forEach(key => {
        if(!process.env[key]) {
            throw new Error(`missing required environment variables ${key}`)
        }
    })
    return  {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL!,
    NODE_ENV:  process.env.NODE_ENV as "development" | "production",
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
    JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
    SUPER_ADMIN_PASS: process.env.SUPER_ADMIN_PASS as string,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
    JWT_REFRESH_EXPIRED: process.env.JWT_REFRESH_EXPIRED as string,
}
}

export const envVars = loadEnvVariables()