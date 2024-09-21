import { Router } from "express";
import { AuthController } from "../controllers/authController";
import {MethodsHandler} from "../util/methodHandler";

const userAuth = Router();

const methodHandler = new MethodsHandler();
const authController = new AuthController();
//auth route
userAuth.post('/login/:userType/:userName',methodHandler.postHandler,authController.userAuthLogin)
userAuth.post('/register/:userType',methodHandler.postHandler,authController.userAuthRegister)


export default userAuth;