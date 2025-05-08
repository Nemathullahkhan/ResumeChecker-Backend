const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const mongoDBURL = process.env.MONGO_URI;
const connectToDb = async()=>{
    try{
        await mongoose.connect(mongoDBURL);
        console.log("Connected to Database");
    }catch(err){
        console.log("Failed to connect to database",err);
        process.exit(1); 
    }
}

module.exports = connectToDb;
