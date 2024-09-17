import { Router } from "express";
import { getInvestor, getInvestorProfile } from "../controllers/inverstorController";
const investerRouter = Router();


//Inverstors route
investerRouter.get('/',getInvestor)
investerRouter.get('/profile',getInvestorProfile)


export default investerRouter;