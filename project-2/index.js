import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";
import dotenv from 'dotenv';
dotenv.config();
import boardRoutes from "./routes/boards.route.js";
import userRoutes from "./routes/users.route.js";
import './config/database.js';
import { authMiddleware } from './middleware.js';

const app = express();

app.use(authMiddleware);
app.use(passport.initialize());
app.use(
    helmet(),
    morgan('dev'),
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    cors({
        origin: 'http://localhost:3000',
    }),
);
app.use('/boards', boardRoutes);
app.use('/users', userRoutes);


export default app;