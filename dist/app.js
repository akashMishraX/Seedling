"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const startupRoutes_1 = __importDefault(require("./routes/startupRoutes"));
const investerRoutes_1 = __importDefault(require("./routes/investerRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const authController_1 = require("./controllers/authController");
const app = (0, express_1.default)();
// middleware
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
// app.use(authenticate);
// Base Route 
const BASE_URL = '/api/v0';
const BASE_URL_STARTUP = BASE_URL + '/startup';
const BASE_URL_INVESTER = BASE_URL + '/investor';
const BASE_URL_AUTH = BASE_URL + '/auth';
// Route Handlers
app.use(BASE_URL_AUTH, authRoutes_1.default);
app.use(BASE_URL_STARTUP, authController_1.authenticate, startupRoutes_1.default); // Protect this route
app.use(BASE_URL_INVESTER, authController_1.authenticate, investerRoutes_1.default); // Protect this route
exports.default = app;
//# sourceMappingURL=app.js.map