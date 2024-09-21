import { Router } from "express";
import { InvestorController } from "../controllers/inverstorController";
import {MethodsHandler} from "../util/methodHandler";
const investerRouter = Router();


const methodHandler = new MethodsHandler();
const investorController = new InvestorController();
//Inverstors route
investerRouter.get('/',methodHandler.getHandler(investorController.getInvestor))
investerRouter.get('/profile',methodHandler.getHandler(investorController.getInvestorProfile))


export default investerRouter;