import {Request , Response} from 'express';
import { createStartup } from '../util/registerStartupHelper';
import { createInvestor } from '../util/registerInvestorHelper';


export const userAuthLogin = (req:Request , res:Response) => {
    res.send('auth');
}

export const userAuthRegister = (req:Request , res:Response) => {
    try {
        const USER_TYPE = req.params.userType;
        if (USER_TYPE == 'startup'){
            createStartup(req.body,req.params.userType,)
        }
        else if (USER_TYPE == 'investor'){
            createInvestor(req.body,req.params.userType)
        }
        else {
            res.status(400).send({ error: 'Invalid user type' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
}





