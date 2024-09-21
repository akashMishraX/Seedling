import { Router } from "express";
import { getStartup, getStartupProfile } from "../controllers/startupController";

const startupRouter = Router();


//Startup route
startupRouter.route('/').get(getStartup)
startupRouter.route('/profile').get(getStartupProfile)

export default startupRouter;