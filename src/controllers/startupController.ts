import {Request , Response} from 'express';

//To get inverstor
export const getStartup = (req:Request , res:Response) => {
    res.send('startup');
}

export const getStartupProfile = (req:Request , res:Response) => {
    res.send('welcome to the startup profile');
}
