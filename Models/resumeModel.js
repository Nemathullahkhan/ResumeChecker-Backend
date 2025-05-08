const mongoose = require("mongoose");

const resumeModel = new mongoose.Schema({
    resume:{
        type:String,
        required:true
    },
    jobDescription: {
        type: String,
    },
    createdAt :{
        type:Date,
        default:Date.now
    }
});
const Resume = mongoose.model("resume", resumeModel);

module.exports = Resume;