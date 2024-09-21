import express from "express";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { Express } from "express";
import startupRouter from "./routes/startupRoutes";
import investerRouter from "./routes/investerRoutes";
import userAuth from "./routes/authRoutes";




export const app:Express = express();

export const PORT = process.env.PORT || 3000;
const CLIENT_ON = process.env.CLIENT_URL   
const LIMIT = process.env.REQUEST_DATA_LIMIT

// middleware
// app.use(cors({
//     origin:CLIENT_ON,
//     credentials: true,
// }));
app.use(express.json({limit:LIMIT}));
app.use(express.urlencoded({extended: true,limit:LIMIT}));
app.use(express.static('public'));
app.use(cookieParser());


// Base Route 
const BASE_URL = '/api/v0'
const BASE_URL_STARTUP = BASE_URL+'/startup'
const BASE_URL_INVESTER = BASE_URL+'/investor'
const BASE_URL_AUTH = BASE_URL+'/auth'
const BASE_URL_NOTIFICATION = BASE_URL+'/notification'
const BASE_URL_TRANSACTION = BASE_URL+'/transaction'



// Route Handlers
app.use(BASE_URL_AUTH, userAuth);
app.use(BASE_URL_STARTUP,  startupRouter); // Protect this route
app.use(BASE_URL_INVESTER,  investerRouter); // Protect this route
app.use(BASE_URL_NOTIFICATION,userAuth);// Protect this route
app.use(BASE_URL_TRANSACTION, userAuth);// Protect this route

