import { Router } from "express";
import { getStartup, getStartupProfile } from "../controllers/startupController";
import { authenticate } from "../middleware/checkAuthentication";

const startupRouter = Router();


//Startup route
startupRouter.route('/').get(authenticate,getStartup)
startupRouter.route('/profile').get(authenticate,getStartupProfile)

export default startupRouter;