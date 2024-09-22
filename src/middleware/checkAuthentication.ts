import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client';
import {Request ,  Response ,NextFunction} from 'express';
import { JwtPayload } from 'jsonwebtoken'
import {Token,key, userLoginData} from './../types/index'
import { ApiError } from '../util/errorHandler';
import { asyncHandler } from '../util/asyncHandler';

const prisma = new PrismaClient();
const KEY : Readonly<key>={ 
    SECRET_KEY : process.env.SECRET_KEY || ""
}

export class JwtHelperFunctions{
    async getJWTToken(USER_DATA : Readonly<userLoginData>) {
        const userRes = await prisma.user.findUnique({
            where: { 
                username: USER_DATA.USER_NAME, 
            },
        });
        if (!userRes) {
            throw new ApiError({statusCode: 401, message: "Unauthorized: Invalid User", errors: [], stack: ''});
        }
        const __ID = userRes.id;
        const playload : Readonly<JwtPayload> = {
            USER_TYPE : USER_DATA.USER_TYPE,
            __ID : __ID
        }
        return jwt.sign(playload,USER_DATA.SECRET_KEY); 
    }
    async verifyJWTToken(token:string,SECERT_KEY:string) {
        if (!token) { 
            return null;
        }
        try {
            return jwt.verify(token,SECERT_KEY);
        } catch (error) {
            return null
        }   
    }
}

export const authenticate = asyncHandler(async (req:Request , res:Response , next:NextFunction)=>{
    const TOKEN : Readonly<Token> ={
        TOKEN_KEY : req.cookies.token
    }
    if (!TOKEN.TOKEN_KEY) {
        throw new ApiError({statusCode: 401, message: "Unauthorized: No token provided", errors: [], stack: ''});
    }
    const helperJwt = new JwtHelperFunctions();
    const decoded = await helperJwt.verifyJWTToken(TOKEN.TOKEN_KEY, KEY.SECRET_KEY) as JwtPayload;
    if (!decoded) {
        throw new ApiError({statusCode: 401, message: "Unauthorized: Invalid token", errors: [], stack: ''});
    }

    const USER_TYPE = req.headers['user-type'] as string;
    console.log(decoded)
    if(decoded.USER_TYPE != USER_TYPE) {
        throw new ApiError({statusCode: 401, message: "Unauthorized: Invalid User", errors: [], stack: ''});
    }
    // Proceed to the next middleware or route handler
    res.locals.__ID = decoded.__ID;
    next()
})




