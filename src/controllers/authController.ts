import {Request , Response} from 'express';
import { createStartup } from '../util/registerStartupHelper';
import { createInvestor } from '../util/registerInvestorHelper';


export const userAuthLogin = (req:Request , res:Response) => {
    res.send('auth');
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





