import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();



async function getJWTToken(username:string,userType:string,password:string,SECERT_KEY:string) {
    const playload = {
        userType : userType,
        username : username,
        password : password
    }
    return jwt.sign(playload,SECERT_KEY); 
}


export async function checkUserAndPassword(usertype:string,username : string,password:string,SECERT_KEY:string) {
    const userRes = await prisma.user.findUnique({
        where: { 
            username: username, 
        },
    });
    if (!userRes) {
        throw new Error('Invalid username or password');
    }
    const loginRes = await prisma.login.findFirst({
        where: { 
            user_id: userRes.id,
            password: password
         },
    });

    if(!loginRes || userRes.username != username) {
        throw new Error('Invalid username or password');
    }

    const token = await getJWTToken(username,usertype, password,SECERT_KEY);
    return token
   
}

