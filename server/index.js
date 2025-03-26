// server.js
import express from "express";

import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import userRoute from './routes/User.routes.js'
import recommendationsRoute from './routes/recommendation.route.js'
dotenv.config();


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDb()
// Routes
app.use('/api/users',userRoute)
app.use("/api", recommendationsRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
