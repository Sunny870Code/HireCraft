const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");
const { jobDescription, resume, selfDescription } = require("./temp");


const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 to 100 indicating how well the candidate resume or prfile matches the job describe "),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical questions canbe asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this questions"),
        answer: z.string().describe("How to answer this question , what  points to cover , what approach to take etc. ")
    })).describe("The question that can be asked in the interview along with their intention and how to answer them."),

    behavioralQuestion: z.array(z.object({
        question: z.string().describe("The behavioral questions canbe asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this questions"),
        answer: z.string().describe("How to answer this question , what  points to cover , what approach to take etc. ")
    })).describe("The question that can be asked in the interview along with their intention and how to answer them."),

    skillGap: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of this skill gap , i.e. how important is this skill is low , medium , high")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),

    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preperation plan, starting from 1"),
        focus: z.string().describe("The main focus of this dat in the preperation plan , e.g. data structure , projects , core subjects etc.."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preperation for the upcoiming interview or test ")
    })).describe("A day-wise preperation plan for the candidate to follow in order to prepare the candidate for the upcoming interview")
})


async function generateInterviewReport({ resume, selfdescription, jobdescription }) {


const prompt = `
You are an expert technical interviewer and career coach.

Analyze the candidate's resume, self-description, and job description provided below to generate a tailored interview report.

-----------------------
Resume:
${resume}

Self Description:
${selfdescription}

Job Description:
${jobdescription}
-----------------------

Return ONLY valid JSON matching this structure:

{
  "matchScore": 75,
  "technicalQuestions": [
    {
      "question": "Question text here",
      "intention": "Interviewer's goal here",
      "answer": "Detailed answer guide here"
    }
  ],
  "behavioralQuestion": [
    {
      "question": "Question text here",
      "intention": "Interviewer's goal here",
      "answer": "STAR method guide here"
    }
  ],
  "skillGap": [
    {
      "skill": "Missing skill name",
      "severity": "low/medium/high"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "Topic focus",
      "tasks": ["Task 1", "Task 2"]
    }
  ]
}

Rules:
- Generate real content based on the provided Resume and Job Description.
- Output ONLY valid JSON.
- No extra fields, no markdown backticks, and no conversational explanation.
- The key "preparationPlan" must be spelled exactly as shown (with an 'a').
- All arrays must contain objects as defined in the schema.
- matchScore must be an integer between 0–100.
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema),
        }
    })


    return JSON.parse(response.text);

}


module.exports = generateInterviewReport;