import {Request , Response} from 'express';
import { createStartup } from '../util/registerStartupHelper';
import { createInvestor } from '../util/registerInvestorHelper';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export const userAuthLogin = (req:Request , res:Response) => {
    const USER_TYPE = req.params.userType;
    const USER_NAME = req.params.userName;

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
            res.status(400).send({ error: 'Invalid user type' });
        }
        res.send(result);
    } catch (error) {
        res.status(500).send({ error:  `${error}` });
    }
}



// async function getUser(usertype:string,username : string) {
//     const existingUser = await prisma.user.findUnique({
//         where: { username: username,  UserRole : usertype  },
//     });
//     if(existingUser){
//         return existingUser.username
//     }
//     else{
//         throw new Error('User not found');
//     }
// }

