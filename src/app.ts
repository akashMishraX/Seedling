import express from "express";
import { Express } from "express";
import startupRouter from "./routes/startupRoutes";
import investerRouter from "./routes/investerRoutes";


const app:Express = express();


// middleware
app.use(express.json());
// app.use(authenticate);

// Route handlers
app.use('/startup', startupRouter);
app.use('/invester', investerRouter);

export default app;