import { Request , Response , NextFunction } from "express";
import {z} from "zod";

const userLoginDataSchema = z.object({
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

const TokenSchema = z.object({
    TOKEN_KEY : z.string().nullable()
})
const AddressType = z.enum(['primary', 'secondary']);
const userRegisterDataSchema = z.object({
    username:z.string().max(20,{ message: "Username must be less than 20 characters" }).min(5,{ message: "Username must be more than 5 characters" }),
    email:z.string().email({ message: "Invalid email address" }),
    country:z.string(),
    city:z.string(),
    pincode:z.string(),
    address_description:z.string(),
    address_type:AddressType,
    password:z.string().max(20,{ message: "Password must be less than 20 characters" }).min(5,{ message: "Password must be more than 5 characters" }),
    category:z.string(),
    categoryDescription:z.string()
})
const apiResponseSchema = z.object({
    statusCode:z.number(),
    message:z.string(),
    data:z.string().nullable(),
})
const customErrorSchema = z.object({
    message:z.string(),
    statusCode:z.number(),
    errors:z.array(z.unknown()),
    stack:z.string()
})

export type userLoginData = z.infer<typeof userLoginDataSchema>
export type JwtPayload = z.infer<typeof JwtPayloadSchema>
export type key = z.infer<typeof keySchema>
export type Token = z.infer<typeof TokenSchema>
export type userStartupRegisterData = z.infer<typeof userRegisterDataSchema>
export type userInvestorRegisterData = Pick<userStartupRegisterData,'username'|'email'|'country'|'city'|'pincode'|'address_description'|'address_type'|'password'>
export type categorySchema = Pick<userStartupRegisterData,'category'|'categoryDescription'>
export type customErrorType = z.infer<typeof customErrorSchema>
export type apiResponseType = z.infer<typeof apiResponseSchema>
export type ControllerFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>;