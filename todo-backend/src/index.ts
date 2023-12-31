import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import userRoute from './routes/userRoute'
import dotenv from 'dotenv';
dotenv.config();
const app = express();

const port = process.env.BACKEND_PORT || 3000;
app.use(cors());
app.use(express.json());
app.use('/',userRoute);

app.listen(port,()=>{
    console.log(`The server is running on port ${port}`)
});

mongoose.connect('mongodb+srv://sheninthjr:Sheninth23@todo.on3kfnx.mongodb.net/Jr-Todo',{dbName:"Jr-Todo"});
