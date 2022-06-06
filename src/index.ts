import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded());

// Database
const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI!,
  {
    autoIndex: false,
  },
  // Callback function
  (err) => {
    if (err) throw err;
    console.log("MongoDB is now connected successfully !");
  }
);

// Routes
app.get("/", (req, res) => {
  res.json({ msg: "Hello Tuan" });
});

// Start Server listening
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Express is listening on port ${port}`);
});
