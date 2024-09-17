import {Request , Response} from 'express';
import { main } from '../models';

//To get inverstor
export const getStartup = (req:Request , res:Response) => {
    main()
}

export const getStartupProfile = (req:Request , res:Response) => {
    res.send('welcome to the startup profile');
}
