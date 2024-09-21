import { Router } from "express";
import { userAuthLogin, userAuthRegister } from "../controllers/authController";



const userAuth = Router();


//auth route
userAuth.post('/login/:userType/:userName',userAuthLogin)
userAuth.post('/register/:userType',userAuthRegister)


export default userAuth;