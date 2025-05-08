const pdfParse = require('pdf-parse');
const Resume = require('../Models/resumeModel');
const pdfUpload = async(req, res) => {
    const {jobDescription} = req.body

    const pdfData = await pdfParse(req.file.buffer)
    const resumeText = pdfData.text;


    const createResume = new Resume({
        resume: resumeText,
        jobDescription: req?.body?.jobDescription
    });
    await createResume.save();
    
    return res.status(200).json({
        message: 'Resume and JD processed successfully',
        resumeText: resumeText, 
        jobDescription: jobDescription
      });
};


module.exports = {pdfUpload};