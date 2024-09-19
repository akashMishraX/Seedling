import { Router } from "express";
import { getInvestor, getInvestorProfile } from "../controllers/inverstorController";
import { authenticate } from "../controllers/authController";
const investerRouter = Router();


//Inverstors route
investerRouter.get('/',getInvestor)
investerRouter.get('/profile',getInvestorProfile)


export default investerRouter;