import {Request ,  Response ,NextFunction} from 'express';
import { createStartup } from '../util/registerStartupHelper';
import { createInvestor } from '../util/registerInvestorHelper';
import { checkUserAndPassword } from '../util/autherizationHelper';
import { verifyJWTToken } from './../middleware/checkAuthentication'
import { JwtPayload } from 'jsonwebtoken';
import {Token , resResult ,userData} from './../types/index'


const SECERT_KEY = process.env.SECERT_KEY || "";



export const userAuthLogin = async (req:Request , res:Response) => {
    const USER_TYPE = req.params.userType;
    const USER_NAME = req.params.userName;
    const PASSWORD = req.body.password;
    const USER_DATA : Readonly<userData> = {
        username : USER_NAME,
        password : PASSWORD,
        usertype : USER_TYPE,
        SECRET_KEY : SECERT_KEY
    }
    try {
        const token : Readonly<Token> = await checkUserAndPassword(USER_DATA);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        const resData : Readonly<resResult> = {
            response : token,
            error : null
        }
        res.status(200).send(resData);
    } catch (error) {
        const resData : Readonly<resResult> = { 
            response : null,
            error:  `${error}` 
        }
        res.status(500).send(resData);
    }
    
}



export const userAuthRegister = async (req:Request , res:Response) => {
    try {
        var result:string = '';
        const USER_TYPE = req.params.userType;
        if (USER_TYPE == 'startup'){
            result = await createStartup(req.body,req.params.userType)
        }
        else if (USER_TYPE == 'investor'){
            result = await createInvestor(req.body,req.params.userType)
        }
        else {
            res.status(400).send({ 
                response : null,
                error: 'Invalid user type'
             });
        }
        res.status(200).send({
            response : result,
            error : null
        });
    } catch (error) {
        res.status(500).send({ 
            response : null,
            error:  `${error}`
         });
    }
}

export async function authenticate(req:Request , res:Response, next :NextFunction){
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send({ error: "Unauthorized: No token provided" });
    }

    const decoded = await verifyJWTToken(token, SECERT_KEY) as JwtPayload;
    if (!decoded) {
        return res.status(401).send({ error: "Unauthorized: Invalid token" });
    }
    const USER_TYPE = req.headers['user-type'] as string;
    if(decoded.userType != USER_TYPE) {
        return res.status(401).send({ error: "Unauthorized" });
    }
    next(); // Proceed to the next middleware or route handler
};


