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

    preperationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preperation plan, starting from 1"),
        focus: z.string().describe("The main focus of this dat in the preperation plan , e.g. data structure , projects , core subjects etc.."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preperation for the upcoiming interview or test ")
    })).describe("A day-wise preperation plan for the candidate to follow in order to prepare the candidate for the upcoming interview")
})


async function generateInterviewReport({ resume, selfdescription, jobdescription }) {


    const prompt = `
                You are an expert technical interviewer and career coach.

                Your task is to analyze the candidate's resume, self-describe, and the job describe, and generate a detailed interview preparation report.

                -----------------------
                // 📄 Candidate Resume:
               ${resume}

                🧑 Candidate Self describe:
                ${selfdescription}

                💼 Job describe:
                ${jobdescription}
                -----------------------

                🎯 Instructions:

                1. Carefully analyze how well the candidate matches the job describe.
                2. Generate a structured JSON response strictly following the given schema.
                3. Do NOT include any explanation, text, or formatting outside JSON.
                4. Keep answers practical, realistic, and helpful for interview preparation.

                -----------------------

                📊 Output Requirements:

                1. matchScore:
                - A number between 0 to 100 based on candidate-job fit.

                2. technicalQuestions:
                - Generate 4–6 relevant technical questions.
                - Focus on skills mentioned in job describe.
                - Include:
                - question
                - intention (why interviewer asks this)
                - answer (how candidate should answer strategically)

                3. behavioralQuestion:
                - Generate 3–5 behavioral questions.
                - Focus on real-world scenarios (teamwork, challenges, deadlines).

                4. skillGap:
                - Identify missing or weak skills compared to job describe.
                - Assign severity:
                - low → nice to have
                - medium → important
                - high → critical gap

                5. preperationPlan:
                - Create a 5–7 day preparation plan.
                - Each day must include:
                - day (starting from 1)
                - focus
                - 2–4 actionable tasks

                -----------------------

                ⚠️ Strict Rules:
                - Output must be valid JSON
                - Do NOT add extra fields
                - Do NOT return text outside JSON
                - Ensure all arrays are non-empty
                - Keep answers concise but useful
                `
    // async function invokeGenAi() {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: zodToJsonSchema(interviewReportSchema),
        }
    });

    const report = JSON.parse(response.text);
    console.log(report);

}


module.exports = generateInterviewReport;