import { Request , Response , NextFunction } from "express";
import {z} from "zod";

const userLoginDataSchema = z.object({
    USER_TYPE : z.string({message: "Invalid user type"}),
    USER_NAME : z.string().max(20,{ message: "Username must be less than 20 characters" }).min(5,{ message: "Username must be more than 5 characters" }),
    PASSWORD : z.string().max(20,{ message: "Password must be less than 20 characters" }).min(5,{ message: "Password must be more than 5 characters" }),
    SECRET_KEY : z.string()
})
const JwtPayloadSchema = z.object({
    USER_TYPE : z.string({message: "Invalid user type"}),
    __ID : z.number({message: "Invalid user id"}),
})
const keySchema = z.object({
    SECRET_KEY : z.string({message: "Invalid secret key"})
})

const TokenSchema = z.object({
    TOKEN_KEY : z.string({message: "Invalid token"}).nullable()
})
const AddressType = z.enum(['primary', 'secondary'],{message: "Invalid address type"});
const userRegisterDataSchema = z.object({
    username:z.string().max(20,{ message: "Username must be less than 20 characters" }).min(5,{ message: "Username must be more than 5 characters" }),
    email:z.string().email({ message: "Invalid email address" }),
    country:z.string({message: "Invalid country"}),
    city:z.string({message: "Invalid city"}),
    pincode:z.string({message: "Invalid pincode"}),
    address_description:z.string({message: "Invalid address description"}),
    address_type:AddressType,
    password:z.string().max(20,{ message: "Password must be less than 20 characters" }).min(5,{ message: "Password must be more than 5 characters" }),
    category:z.string({message: "Invalid category"}),
    categoryDescription:z.string()
})
const apiResponseSchema = z.object({
    statusCode:z.number(),
    message:z.string(),
    data:z.object({})
})
const customErrorSchema = z.object({
    message:z.string(),
    statusCode:z.number(),
    errors:z.array(z.unknown()),
    stack:z.string()
})
const projectSchema = z.object({
    __ID:z.number({message: "Invalid user id"}),
    project_id:z.number({message: "Invalid project id"}),
    name:z.string({message: "Invalid name"}),
    description:z.string({message: "Invalid description"}),
    goal_amount:z.number({message: "Invalid goal amount"}),
    raised_amount:z.number({message : "Invalid raised amount"}),
    start_date:z.string().refine(date => !isNaN(Date.parse(date)), {message: "Invalid start date"}),
    end_date: z.string().refine(date => !isNaN(Date.parse(date)), {message: "Invalid end date"}),
    active : z.boolean(),
})
const postSchema = z.object({
    project_id:z.number(),
    post_id:z.number(),
    title:z.string(),
    content:z.string()
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

type projectMainType = z.infer<typeof projectSchema>
export type projectType = Pick<projectMainType,'__ID'|'name'|'description'|'goal_amount'|'raised_amount'|'start_date'|'end_date'>
export type projectReadOrDeleteType = Pick<projectMainType,'project_id'>
export type projectUpdateType = Pick<projectMainType,'project_id'| 'name'|'description'|'goal_amount'|'raised_amount'|'start_date'|'end_date' | 'active'>

type postMainType = z.infer<typeof postSchema>
export type postType = Pick<postMainType, 'project_id' | 'title' | 'content'>
export type postReadOrDeleteType = Pick<postMainType,'project_id'|'post_id'>
export type postUpdateType = Pick<postMainType,'project_id'|'post_id'|'title'|'content'>