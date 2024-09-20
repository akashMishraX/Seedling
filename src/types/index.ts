import {z} from "zod";

const userDataSchema = z.object({
    USER_TYPE : z.string(),
    USER_NAME : z.string().max(20,{ message: "Username must be less than 20 characters" }).min(5,{ message: "Username must be more than 5 characters" }),
    PASSWORD : z.string().max(20,{ message: "Password must be less than 20 characters" }).min(5,{ message: "Password must be more than 5 characters" }),
    SECRET_KEY : z.string()
})
const JwtPayloadSchema = z.object({
    USER_TYPE : z.string(),
    USER_NAME : z.string().max(20,{ message: "Username must be less than 20 characters" }).min(5,{ message: "Username must be more than 5 characters" }),
    PASSWORD : z.string().max(20,{ message: "Password must be less than 20 characters" }).min(5,{ message: "Password must be more than 5 characters" })
})
const keySchema = z.object({
    SECRET_KEY : z.string()
})
const resResultSchema = z.object({
    RESPONSE : z.string().nullable(),
    ERROR : z.string().nullable()
})
const TokenSchema = z.object({
    TOKEN_KEY : z.string().nullable()
})


export type userData = z.infer<typeof userDataSchema>
export type JwtPayload = z.infer<typeof JwtPayloadSchema>
export type key = z.infer<typeof keySchema>
export type resResult = z.infer<typeof resResultSchema>
export type Token = z.infer<typeof TokenSchema>