import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import {JwtPayload,userData} from './../types/index'

const prisma = new PrismaClient();


async function getJWTToken(USER_DATA :userData) {
    const playload : Readonly<JwtPayload> = {
        usertype : USER_DATA.usertype,
        username : USER_DATA.username,
        password : USER_DATA.password
    }
    return jwt.sign(playload,USER_DATA.SECRET_KEY); 
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

    const token = await getJWTToken(USER_DATA);
    return token
   
}

