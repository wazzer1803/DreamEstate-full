import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js'; 
import listingRoutes from './routes/listing.route.js';
dotenv.config();

mongoose
  .connect('mongodb+srv://sahilchauksey:sahilchauksey@cluster0.2stnfn6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

  
  const app = express();
  
  
  app.use(express.json());
  
  app.use(cookieParser());
  
  app.listen(3000, () => {
    console.log('Server is running on port 3000!');
  });
  
  app.use('/api/user',userRoutes)
  app.use('/api/auth',authRoutes)
  app.use('/api/listing',listingRoutes)
  
  const __dirname = path.resolve();


app.use((err,req,res,next)=>{
 const statusCode = err.statusCode || 500;
 const message = err.message||'Internal Server Error';  
  return res.status(statusCode).json({success:false,message});
  next()
})
// export default app;