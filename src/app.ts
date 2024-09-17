import express from "express";
import { Express } from "express";
import startupRouter from "./routes/startupRoutes";
import investerRouter from "./routes/investerRoutes";
import userAuth from "./routes/authRoutes";


const app:Express = express();


// middleware
app.use(express.json());


// app.use(authenticate);


// Base Route 
const BASE_URL = '/api/v0'
const BASE_URL_STARTUP = BASE_URL+'/startup'
const BASE_URL_INVESTER = BASE_URL+'/invester'
const BASE_URL_AUTH = BASE_URL+'/auth'

// Route Handlers

app.use(BASE_URL_AUTH,userAuth);
app.use(BASE_URL_STARTUP, startupRouter);
app.use(BASE_URL_INVESTER, investerRouter);

export default app;