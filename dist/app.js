"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const startupRoutes_1 = __importDefault(require("./routes/startupRoutes"));
const investerRoutes_1 = __importDefault(require("./routes/investerRoutes"));
const app = (0, express_1.default)();
// middleware
app.use(express_1.default.json());
// app.use(authenticate);
// Route handlers
app.use('/startup', startupRoutes_1.default);
app.use('/invester', investerRoutes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map