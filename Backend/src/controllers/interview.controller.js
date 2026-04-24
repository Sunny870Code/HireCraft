const pdfParse = require("pdf-parse")
const generateInterviewReport = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model");

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


module.exports = { generateInterviewReportController };