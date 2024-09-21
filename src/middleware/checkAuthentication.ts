import jwt from 'jsonwebtoken'
import {Request ,  Response ,NextFunction} from 'express';
import { JwtPayload } from 'jsonwebtoken'
import {Token,key, userLoginData} from './../types/index'
import { ApiError } from '../util/errorHandler';
import { asyncHandler } from '../util/asyncHandler';

const KEY : Readonly<key>={ 
    SECRET_KEY : process.env.SECRET_KEY || ""
}

export class JwtHelperFunctions{
    async getJWTToken(USER_DATA : Readonly<userLoginData>) {
        const playload : Readonly<JwtPayload> = {
            USER_TYPE : USER_DATA.USER_TYPE,
            USER_NAME : USER_DATA.USER_NAME,
            PASSWORD : USER_DATA.PASSWORD
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

export const authenticate = asyncHandler(async (req:Request , res:Response)=>{
    const TOKEN : Readonly<Token> ={
        TOKEN_KEY : req.cookies.token
    }
    if (!TOKEN.TOKEN_KEY) {
        throw new ApiError({statusCode: 401, message: "Unauthorized: No token provided", errors: [], stack: ''});
    }
    const helperJwt = new JwtHelperFunctions();
    const decoded = await helperJwt.verifyJWTToken(TOKEN.TOKEN_KEY, KEY.SECRET_KEY) as JwtPayload;
    if (!decoded) {
        return res.status(401).send({ error: "Unauthorized: Invalid token" });
    }
    const USER_TYPE = req.headers['User-Type'] as string;
    if(decoded.userType != USER_TYPE) {
        return res.status(401).send({ error: "Unauthorized" });
    }
    // Proceed to the next middleware or route handler
})




