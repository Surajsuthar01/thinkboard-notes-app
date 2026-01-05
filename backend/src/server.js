import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import rateLimiter from "./middleware/rateLimiter.js";
import notesRoutes from "./routes/notesRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./config/db.js";



dotenv.config();


const app =express();
const PORT=process.env.PORT||5001
app.use(express.json());

// middleware
app.use(cors({
  origin:"http://localhost:5173",
}));

app.use(express.json());
app.use("/api",rateLimiter);

// app.use((req,res,next)=>{
//     console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//     next();
// });

app.use("/api/auth", authRoutes);

app.use("/api/notes",notesRoutes);

connectDB().then(()=>{
  app.listen(PORT,()=>{
    console.log("Server Statted on PORT:",PORT);
});
});


