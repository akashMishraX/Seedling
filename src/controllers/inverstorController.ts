import {Request , Response} from 'express';

//To get inverstor
export const getInvestor = (req:Request , res:Response) => {
    res.send('inverstor');
}

export const getInvestorProfile = (req:Request , res:Response) => {
    res.send('welcome to the inverstor profile');
}
