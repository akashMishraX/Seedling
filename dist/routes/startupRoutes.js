"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const startupController_1 = require("../controllers/startupController");
const startupRouter = (0, express_1.Router)();
//Inverstors route
startupRouter.get('/', startupController_1.getStartup);
startupRouter.get('/profile', startupController_1.getStartupProfile);
exports.default = startupRouter;
//# sourceMappingURL=startupRoutes.js.map