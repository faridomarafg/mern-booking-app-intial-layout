import express, {Request, Response} from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import cookieParser from 'cookie-parser';
import path from 'path';

//mongodb connection. 
mongoose.connect(process.env.MONGODB_URI as string)


const app = express();
app.use(cookieParser());
app.use(express.json());//help us to convert  the body of api to json.
app.use(express.urlencoded({extended: true}));//
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

//go to the frontend dist folder, which has the compiled statict asset, and serves those file in the of our 'url'
app.use(express.static(path.join(__dirname,'../../frontend/build')));

//ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.listen(3500, ()=>{
    console.log('app is running on port 3500  ');
})