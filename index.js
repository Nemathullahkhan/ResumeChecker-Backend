const express = require("express");
const app = express();
const extractTextRouter = require("./routes/extractText");
const connectToDb = require("./config/connectToDb");
const analyzeResumeRouter = require("./routes/analyze");

app.use(express.json()); 
app.use("/read", extractTextRouter);
app.use("/analyze", analyzeResumeRouter)

app.listen(8000, () => {
    connectToDb()
    console.log("Server running on port 8000");
});