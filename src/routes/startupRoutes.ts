import { Router } from "express";
import { getStartup, getStartupProfile } from "../controllers/startupController";
const startupRouter = Router();


//Inverstors route
startupRouter.get('/',getStartup)
startupRouter.get('/profile',getStartupProfile)


export default startupRouter;