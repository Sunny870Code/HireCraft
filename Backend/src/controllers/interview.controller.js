const pdfParse = require("pdf-parse")
const generateInterviewReport = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model");



/**
 * 
 * @description Controller to generate the interview report based on self description , resume, job description 
 * 
 */
async function generateInterviewReportController(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Resume file is required" });
        }

        const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText();
        const { selfDescription, jobDescription } = req.body
        // console.log(resumeContent)

        // if (!resume || !jobDescription) {
        //         return res.status(400).json({ error: "Missing required fields" });
        //     }
        const interviewReportByAi = await generateInterviewReport({
            resume: resumeContent.text,
            selfDescription,
            jobDescription
        });

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
            ...interviewReportByAi
        })

        res.status(201).json({
            message: "Interview Report generated successfully",
            interviewReport
        })
    } catch (error) {
        console.error("Controller Error:", error);

        return res.status(500).json({
            error:
                "Failed to generate interview report",
            details: error.message,
        });
    }

}


/**
 * 
 * @description Controller to get all interview report
 */

async function getInterviewReportByIdController(req,res) {
    const {interviewId} = req.params

    const interviewReport = await interviewReportModel.findOne({_id: interviewId,user: req.user.id})

    if(!interviewReport){
        return res.status(404).json({
            message:"Interview report not found"
        })
    }

    res.status(200).json({
        message:"INterview report fetched successfully.",
        interviewReport
    })
}


/**
 * 
 * @description Controller to get all interview report
 */
async function getAllInterviewReportsController(req,res){
    const interviewReports = await interviewReportModel.find({user: req.user.id}).sort({createdAt:-1}).select("-resume -selfDescription -jobDescription -_v -technicalQuestions -behavioralQuestion -skillGaps -preperationPlan")
}


module.exports = { generateInterviewReportController , getInterviewReportByIdController, getAllInterviewReportsController};