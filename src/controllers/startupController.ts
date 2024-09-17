import {Request , Response} from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


//To get startup
export const getStartup = (req: Request, res: Response): void => {
    try {
        if (!req || !res) {
            throw new Error('Missing request or response objects');
        }

        res.send('startup');
    } catch (error) {
        console.error('Error in getStartup function:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}

export const getStartupProfile = (req:Request , res:Response) => {
    res.send('welcome to the startup profile');
}


async function createRoles() {
    const role = await prisma.roles.createMany({
        data: [
            {
                role_name: 'startup'
            },
            {
                role_name: 'investor'
            },
            {
                role_name: 'admin'
            }

        ]   
    })
}

