const mongoose = require("mongoose");

const resumeModel = new mongoose.Schema({
    resume:{
        type:String,
        required:true
    },
    jobDescription: {
        type: String,
        required: true
    }
});
const Resume = mongoose.model("resume", resumeModel);

module.exports = Resume;