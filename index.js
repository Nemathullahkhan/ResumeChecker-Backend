const express = require("express");

const app = express();

app.get("/api/test",(req,res)=>{
    res.send("Working");
})
app.listen(8000, () => {
    console.log("Server running on port 8000");
}); 