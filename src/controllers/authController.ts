import {Request ,  Response} from 'express';
import { StartupHelperFunctions } from './startupController'
import { InvestorHelperFunctions } from './inverstorController'
import {Token, key, userLoginData} from './../types/index'
import { PrismaClient } from '@prisma/client';
import { ApiResponse } from '../util/responseHandler';
import { asyncHandler } from '../util/asyncHandler';
import { JwtHelperFunctions } from '../middleware/checkAuthentication';
import { ApiError } from '../util/errorHandler';

const prisma = new PrismaClient();

const KEY : Readonly<key>={ 
    SECRET_KEY : process.env.SECRET_KEY || ""
}
// asyncHandler()
export const userAuthLogin =asyncHandler(async (req:Request , res:Response)=>{
    const USER_DATA : Readonly<userLoginData> = {
        USER_TYPE : req.params.userType,
        USER_NAME : req.params.userName,
        PASSWORD : req.body.password,
        SECRET_KEY : KEY.SECRET_KEY
    }
    const token : Readonly<Token> = {
        TOKEN_KEY : await checkUserAndPassword(USER_DATA)
    }
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    const resData = new ApiResponse({statusCode : 200, message : "User logged in successfully",data : token});
    res.status(200).send(resData);
})
export const userAuthRegister = asyncHandler(async (req:Request , res:Response)=>{
    const helperInvestor = new InvestorHelperFunctions();
    const helperStartup= new StartupHelperFunctions();
    
    var result:boolean = false;
    const USER_TYPE = req.params.userType;
    if (USER_TYPE == 'startup'){
        result = await helperStartup.createStartup(req.body,req.params.userType)
    }
    else if (USER_TYPE == 'investor'){
        result = await helperInvestor.createInvestor(req.body,req.params.userType)
    }
    else {
        throw new ApiError({statusCode: 400, message: "Invalid user type", errors: [], stack: ''});
    }
    if (!result) {
        throw new ApiError({statusCode: 500, message: "Internal server error", errors: [], stack: ''});
    }
    const resData = new ApiResponse({statusCode : 200,  message : "User registered successfully",data : {}});
    res.status(resData.statusCode).json(resData);
})


export const checkUserAndPassword =async (USER_DATA : Readonly<userLoginData>)=>{
    try {
        const userRes = await prisma.user.findUnique({
            where: { 
                username: USER_DATA.USER_NAME, 
            },
        });
        if (!userRes) {
            throw new ApiError({statusCode: 404, message: "User not found", errors: [], stack: ''});
        }
        const loginRes = await prisma.login.findFirst({
            where: { 
                user_id: userRes.id,
                password: USER_DATA.PASSWORD
                },
        });
        if(!loginRes || userRes.username != USER_DATA.USER_NAME) {
            throw new ApiError({statusCode: 401, message: "Invalid credentials", errors: [], stack: ''});
        }
        const helperJwt = new JwtHelperFunctions();
        const token = await helperJwt.getJWTToken(USER_DATA);
        return token
    } catch (error) {
        throw new ApiError({statusCode: 500, message: "Internal server error", errors: [], stack: ''});
    }
         
}
     


