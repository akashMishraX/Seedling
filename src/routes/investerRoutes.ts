import { Router } from "express";
import { getInvestor, getInvestorProfile } from "../controllers/inverstorController";


const investerRouter = Router();

//Inverstors route
investerRouter.route('/').get(getInvestor)
investerRouter.route('/profile').get(getInvestorProfile)

export default investerRouter;