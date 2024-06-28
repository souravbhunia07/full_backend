import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser'; 

const app = express(); 

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({
    limit: '20kb'
})); // Parse JSON from the request body

app.use(bodyParser.urlencoded({extended: true, limit: "16kb"})); // Parse URL-encoded data from the request body

app.use(express.static('public')); // Serve static files from the 'public' directory

app.use(cookieParser()); // Parse cookies from the request headers

// routes import
import userRouter from './routes/user.routes.js';

// routes declaration
app.use('/api/v1/users', userRouter);

export { app };

