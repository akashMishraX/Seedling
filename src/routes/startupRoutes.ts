import { Router } from "express";
import { getStartup, getStartupProfile } from "../controllers/startupController";
import { authenticate } from "../controllers/authController";

const startupRouter = Router();


//Startup route
startupRouter.get('/',getStartup)
startupRouter.get('/profile',getStartupProfile)


export default startupRouter;