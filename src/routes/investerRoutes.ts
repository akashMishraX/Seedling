import { Router } from "express";
import { getInvestor, getInvestorProfile } from "../controllers/inverstorController";
import { authenticate } from "../middleware/checkAuthentication";

const investerRouter = Router();

//Inverstors route
investerRouter.route('/').get(authenticate,getInvestor)
investerRouter.route('/profile').get(authenticate,getInvestorProfile)

export default investerRouter;