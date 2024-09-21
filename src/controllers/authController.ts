import {Request ,  Response} from 'express';
import { StartupHelperFunctions } from './startupController'
import { InvestorHelperFunctions } from './inverstorController'
import {Token, key, resResult, userLoginData} from './../types/index'
import { PrismaClient } from '@prisma/client';
import { JwtHelperFunctions } from '../middleware/checkAuthentication';


const prisma = new PrismaClient();



const KEY : Readonly<key>={ 
    SECRET_KEY : process.env.SECRET_KEY || ""
}
export class AuthController{
    async userAuthLogin(req:Request , res:Response){
        const USER_DATA : Readonly<userLoginData> = {
            USER_TYPE : req.params.userType,
            USER_NAME : req.params.userName,
            PASSWORD : req.body.password,
            SECRET_KEY : KEY.SECRET_KEY
        }
        try {
            const checkUserAndPassword = new AuthHelperFunctions();
            const token : Readonly<Token> = {
                TOKEN_KEY : await checkUserAndPassword.checkUserAndPassword(USER_DATA)
            }
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            });
            const resData : Readonly<resResult> = {
                RESPONSE : token.TOKEN_KEY,
                ERROR : null
            }
            res.status(200).send(resData);
        } catch (error) {
            const resData : Readonly<resResult> = { 
                RESPONSE : null,
                ERROR:  `${error}` 
            }
            res.status(500).send(resData);
        }
        
    }
    async userAuthRegister(req:Request , res:Response){
        const helperInvestor = new InvestorHelperFunctions();
        const helperStartup= new StartupHelperFunctions();
    
        try {
            var result:string = '';
            const USER_TYPE = req.params.userType;
            if (USER_TYPE == 'startup'){
                result = await helperStartup.createStartup(req.body,req.params.userType)
            }
            else if (USER_TYPE == 'investor'){
                result = await helperInvestor.createInvestor(req.body,req.params.userType)
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
}

export class AuthHelperFunctions{
    async checkUserAndPassword(USER_DATA : Readonly<userLoginData>) {
        const userRes = await prisma.user.findUnique({
            where: { 
                username: USER_DATA.USER_NAME, 
            },
        });
        if (!userRes) {
            throw new Error('Invalid username or password');
        }
        const loginRes = await prisma.login.findFirst({
            where: { 
                user_id: userRes.id,
                password: USER_DATA.PASSWORD
             },
        });
        if(!loginRes || userRes.username != USER_DATA.USER_NAME) {
            throw new Error('Invalid username or password');
        }
        const helperJwt = new JwtHelperFunctions();
        const token = await helperJwt.getJWTToken(USER_DATA);
        return token      
    }
    
}

