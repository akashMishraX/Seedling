import { Router } from "express";
import { StartupController } from "../controllers/startupController";

const startupRouter = Router();

const startupController = new StartupController();
//Startup route
startupRouter.get('/',startupController.getStartup)
startupRouter.get('/profile',startupController.getStartupProfile)


export default startupRouter;