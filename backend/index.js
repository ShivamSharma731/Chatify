import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoutes.js";

dotenv.config();

const app = express();
const Port = process.env.PORT || 3001;
const databaseURL = process.env.DATABASE_URL;

app.use(
  cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true, // to enable cookies
  })
);

app.use(cookieParser());
app.use(express.json());

// uses authRoutes 
app.use("/api/auth", authRoutes);

app.listen(Port, () => {
  console.log(`Server is running at : http://localhost:${Port}`);
});

mongoose
  .connect(databaseURL)
  .then(() => {
    console.log("Database connected !!");
  })
  .catch((err) => console.log(err.message));
