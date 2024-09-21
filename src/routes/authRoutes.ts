import { Router } from "express";
import { AuthController } from "../controllers/authController";

const userAuth = Router();
const authController = new AuthController();
//auth route
userAuth.post('/login/:userType/:userName',authController.userAuthLogin)
userAuth.post('/register/:userType',authController.userAuthRegister)


export default userAuth;