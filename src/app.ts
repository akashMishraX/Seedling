import express from "express";
import cookieParser from 'cookie-parser';
import { Express } from "express";
import startupRouter from "./routes/startupRoutes";
import investerRouter from "./routes/investerRoutes";
import userAuth from "./routes/authRoutes";
import { authenticate } from "./controllers/authController";
const app:Express = express();
// middleware
app.use(cookieParser());
app.use(express.json());

// app.use(authenticate);

// Base Route 
const BASE_URL = '/api/v0'
const BASE_URL_STARTUP = BASE_URL+'/startup'
const BASE_URL_INVESTER = BASE_URL+'/investor'
const BASE_URL_AUTH = BASE_URL+'/auth'

// Route Handlers

app.use(BASE_URL_AUTH, userAuth);
app.use(BASE_URL_STARTUP, authenticate, startupRouter); // Protect this route
app.use(BASE_URL_INVESTER, authenticate, investerRouter); // Protect this route

export default app;