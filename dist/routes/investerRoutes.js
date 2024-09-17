"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inverstorController_1 = require("../controllers/inverstorController");
const investerRouter = (0, express_1.Router)();
//Inverstors route
investerRouter.get('/', inverstorController_1.getInvestor);
investerRouter.get('/profile', inverstorController_1.getInvestorProfile);
exports.default = investerRouter;
//# sourceMappingURL=investerRoutes.js.map