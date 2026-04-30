const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");
const { jobDescription, resume, selfDescription } = require("./temp");


const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY
})

// const interviewReportSchema = z.object({
//   matchScore: z.number().describe("A score between 0 to 100 indicating how well the candidate resume or prfile matches the job describe "),
//   technicalQuestions: z.array(z.object({
//     question: z.string().describe("The technical questions canbe asked in the interview"),
//     intention: z.string().describe("The intention of interviewer behind asking this questions"),
//     answer: z.string().describe("How to answer this question , what  points to cover , what approach to take etc. ")
//   })).describe("The question that can be asked in the interview along with their intention and how to answer them."),

//   behavioralQuestion: z.array(z.object({
//     question: z.string().describe("The behavioral questions canbe asked in the interview"),
//     intention: z.string().describe("The intention of interviewer behind asking this questions"),
//     answer: z.string().describe("How to answer this question , what  points to cover , what approach to take etc. ")
//   })).describe("The question that can be asked in the interview along with their intention and how to answer them."),

//   skillGap: z.array(z.object({
//     skill: z.string().describe("The skill which the candidate is lacking"),
//     severity: z.enum(["low", "medium", "high"]).describe("The severity of this skill gap , i.e. how important is this skill is low , medium , high")
//   })).describe("List of skill gaps in the candidate's profile along with their severity"),

//   preparationPlan: z.array(z.object({
//     day: z.number().describe("The day number in the preperation plan, starting from 1"),
//     focus: z.string().describe("The main focus of this dat in the preperation plan , e.g. data structure , projects , core subjects etc.."),
//     tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preperation for the upcoiming interview or test ")
//   })).describe("A day-wise preperation plan for the candidate to follow in order to prepare the candidate for the upcoming interview")
// })

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .min(0)
    .max(100)
    .describe(
      "A score between 0 and 100 indicating how well the candidate's resume/profile matches the job description."
    ),

  technicalQuestions: z
    .array(z.string())
    .min(5)
    .describe(
      "List of technical interview questions tailored to the candidate profile and job role."
    ),

  behavioralQuestion: z
    .array(z.string())
    .min(3)
    .describe(
      "List of behavioral or HR interview questions tailored to the candidate profile."
    ),

  skillGap: z
    .array(z.string())
    .min(3)
    .describe(
      "List of missing or weak skills the candidate should improve for this job."
    ),

  preparationPlan: z
    .array(z.string())
    .min(5)
    .describe(
      "Day-wise preparation plan with tasks for interview readiness."
    ),
  title: z.string().describe("The job title extracted from description...")
});


async function generateInterviewReport({ resume, selfdescription, jobdescription }) {


  //   const prompt = `
  // You are an expert technical interviewer and career coach.

  // Analyze the candidate's resume, self-description, and job description provided below to generate a tailored interview report.

  // -----------------------
  // Resume:
  // ${resume}

  // Self Description:
  // ${selfdescription}

  // Job Description:
  // ${jobdescription}
  // -----------------------

  // Return ONLY valid JSON matching this structure:

  // {
  //   "matchScore": 75,
  //   "technicalQuestions": [
  //     {
  //       "question": "Question text here",
  //       "intention": "Interviewer's goal here",
  //       "answer": "Detailed answer guide here"
  //     }
  //   ],
  //   "behavioralQuestion": [
  //     {
  //       "question": "Question text here",
  //       "intention": "Interviewer's goal here",
  //       "answer": "STAR method guide here"
  //     }
  //   ],
  //   "skillGap": [
  //     {
  //       "skill": "Missing skill name",
  //       "severity": "low/medium/high"
  //     }
  //   ],
  //   "preparationPlan": [
  //     {
  //       "day": 1,
  //       "focus": "Topic focus",
  //       "tasks": ["Task 1", "Task 2"]
  //     }
  //   ]
  // }

  // Rules:
  // - Generate real content based on the provided Resume and Job Description.
  // - Output ONLY valid JSON.
  // - No extra fields, no markdown backticks, and no conversational explanation.
  // - The key "preparationPlan" must be spelled exactly as shown (with an 'a').
  // - All arrays must contain objects as defined in the schema.
  // - matchScore must be an integer between 0–100.


  // Do NOT return string arrays.
  // `;

  const prompt = `
You are an expert technical interviewer, hiring manager, and career coach.

Your task is to analyze the candidate's Resume, Self Description, and Job Description, then generate a realistic and useful interview preparation report.

Use the candidate's actual skills, projects, education, and experience level while comparing them against the job requirements.

--------------------------------------------------
CANDIDATE RESUME:
${resume}

SELF DESCRIPTION:
${selfdescription}

JOB DESCRIPTION:
${jobdescription}
--------------------------------------------------

Return ONLY valid JSON in the exact structure below.

{
  "title": "Job Title Here",
  "matchScore": 85,
  "technicalQuestions": [
    {
      "question": "Question text",
      "intention": "Why interviewer asks this",
      "answer": "Strong answer strategy with key points to mention"
    }
  ],
  "behavioralQuestion": [
    {
      "question": "Question text",
      "intention": "Why interviewer asks this",
      "answer": "Answer using STAR method with suggested approach"
    }
  ],
  "skillGap": [
    {
      "skill": "Missing or weak skill",
      "severity": "low"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "Main preparation topic",
      "tasks": [
        "Task 1",
        "Task 2"
      ]
    }
  ]
}

STRICT RULES:

1. Output ONLY raw JSON.
2. No markdown.
3. No explanation text.
4. No backticks.
5. No comments.
6. No extra keys.
7. No null values.
8. No empty arrays.
9. No placeholder text.
10. No generic content.

CONTENT RULES:

1. matchScore must be an integer from 0 to 100.
2. technicalQuestions must contain exactly 5 objects.
3. behavioralQuestion must contain exactly 3 objects.
4. skillGap must contain exactly 4 objects.
5. preparationPlan must contain exactly 5 objects.
6. Every array item must be a complete object.
7. Every "tasks" array must contain at least 3 tasks.
8. skillGap.severity must be only:
   "low", "medium", or "high"

QUALITY RULES:

1. Questions must be tailored to candidate's resume and job role.
2. Mention candidate projects when relevant.
3. Mention MERN stack, React, Node.js, MongoDB, APIs, authentication, database optimization, DSA, deployment, teamwork etc when relevant.
4. preparationPlan must be practical and day-wise.
5. skillGap must be realistic based on missing requirements.
6. Answers must be interview-ready and valuable.

IMPORTANT:

If candidate is fresher, focus on projects, fundamentals, learning ability, and internships.

Return valid JSON now.
`;
  let retries = 3;

  while (retries > 0) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: zodToJsonSchema(interviewReportSchema),
        },
      });

      return JSON.parse(response.text);

    } catch (error) {
      if (error.status === 503 && retries > 1) {
        console.log("Model busy... retrying");
        await new Promise((res) => setTimeout(res, 3000));
        retries--;
      }
      else if (error.status === 429) {
        throw new Error("Gemini quota exceeded. Try later.");
        retries--;
      } else {
        throw error;
      }
    }

  }
}


module.exports = generateInterviewReport;