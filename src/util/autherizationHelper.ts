import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import {JwtPayload,userData} from './../types/index'

const prisma = new PrismaClient();


async function getJWTToken(USER_DATA :userData) {
    const playload : Readonly<JwtPayload> = {
        USER_TYPE : USER_DATA.USER_TYPE,
        USER_NAME : USER_DATA.USER_NAME,
        PASSWORD : USER_DATA.PASSWORD
    }
    return jwt.sign(playload,USER_DATA.SECRET_KEY); 
}


export async function checkUserAndPassword(USER_DATA : Readonly<userData>) {
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

    const token = await getJWTToken(USER_DATA);
    return token
   
}

