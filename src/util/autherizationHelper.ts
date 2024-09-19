import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import {JwtPayload,userData} from './../types/index'

const prisma = new PrismaClient();



async function getJWTToken(username:string,userType:string,password:string,SECERT_KEY:string) {
    const playload : Readonly<JwtPayload> = {
        userType : userType,
        username : username,
        password : password
    }
    return jwt.sign(playload,SECERT_KEY); 
}


export async function checkUserAndPassword(USER_DATA : Readonly<userData>) {
    const userRes = await prisma.user.findUnique({
        where: { 
            username: USER_DATA.username, 
        },
    });
    if (!userRes) {
        throw new Error('Invalid username or password');
    }
    const loginRes = await prisma.login.findFirst({
        where: { 
            user_id: userRes.id,
            password: USER_DATA.password
         },
    });

    if(!loginRes || userRes.username != USER_DATA.username) {
        throw new Error('Invalid username or password');
    }

    const token = await getJWTToken(USER_DATA.username,USER_DATA.usertype, USER_DATA.password,USER_DATA.SECRET_KEY);
    return token
   
}

