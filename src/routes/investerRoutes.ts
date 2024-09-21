import { Router } from "express";
import { InvestorController } from "../controllers/inverstorController";
const investerRouter = Router();

const investorController = new InvestorController();
//Inverstors route
investerRouter.get('/',investorController.getInvestor)
investerRouter.get('/profile',investorController.getInvestorProfile)


export default investerRouter;