import { Router } from "express";
import { StartupController } from "../controllers/startupController";
import {MethodsHandler} from "../util/methodHandler";
const startupRouter = Router();

const startupController = new StartupController();
const methodHandler = new MethodsHandler();
//Startup route
startupRouter.get('/',methodHandler.getHandler,startupController.getStartup)
startupRouter.get('/profile',methodHandler.getHandler,startupController.getStartupProfile)


export default startupRouter;