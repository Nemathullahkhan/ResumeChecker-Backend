const express = require("express");
const app = express();
const extractTextRouter = require("./routes/extractText");
const connectToDb = require("./config/connectToDb");
const analyzeResumeRouter = require("./routes/analyze");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();


const allowedOrigins = process.env.ALLOWED_ORIGINS || 'http://localhost:5173/';
app.use(express.json()); 
app.use( cors({
    origin: (origin, callback) => {
      console.log(`CORS Request Origin: ${origin}`); // Debug incoming origin
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error(`CORS Error: Origin ${origin} not allowed`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }))

app.use("/read", extractTextRouter);
app.use("/analyze", analyzeResumeRouter)

app.listen(8000, () => {
    connectToDb()
    console.log("Server running on port 8000");
});