const { GoogleGenAI } = require("@google/genai");
const { z, config } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");
const { jobDescription, resume, selfDescription } = require("./temp");
const puppeteer = require("puppeteer");
// const { response, response } = require("express");

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
        model: "gemini-2.5-flash",
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
        throw new Error("Gemini quota exceeded 1. Try later.");
        retries--;
      } else {
        throw error;
      }
    }

  }
}

async function generatePdfFromHTML(htmlContent) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "networkidle0" })

  const pdfBuffer = await page.pdf({ format: "A4", margin:{
    top: "10mm",
    bottom: "10mm",
    left: "5mm",
    right: "5mm"
  } })
  await browser.close()
  return pdfBuffer
}


async function generateResumepdf({ resume, selfDescription, jobDescription }) {
  const resumepdfSchema = z.object({
    html: z.string().describe("THE HTML content of the resume which can be converted to pdf using any library like puppeteer")

  })


  const prompt = `You are an expert resume writer, ATS optimization specialist, and hiring manager.

Your task is to generate a highly professional, ATS-friendly resume in clean HTML format based on the candidate's Resume, Self Description, and Job Description.

----------------------------------------
INPUT DATA:

CANDIDATE RESUME:
${resume}

SELF DESCRIPTION:
${selfDescription}

JOB DESCRIPTION:
${jobDescription}
----------------------------------------

OBJECTIVE:

Create a tailored resume that maximizes the candidate’s chances of passing Applicant Tracking Systems (ATS) and impressing human recruiters.

----------------------------------------
STRICT OUTPUT FORMAT:

Return ONLY valid JSON:

{
  "html": "<FULL HTML RESUME HERE>"
}

DO NOT include:
- Markdown
- Backticks
- Explanations
- Comments
- Extra keys

----------------------------------------
HTML REQUIREMENTS:

1. Use clean, semantic HTML (no external CSS or JS)
2. Use inline styling only (minimal and professional)
3. Structure sections clearly using:
   - <h1>, <h2>, <p>, <ul>, <li>
4. Ensure proper spacing, alignment, and readability
5. Use bullet points for experience and projects
6. Keep layout ATS-friendly (NO tables for layout, no fancy graphics)

----------------------------------------
RESUME STRUCTURE (MANDATORY):

1. Header:
   - Full Name
   - Phone
   - Email
   - LinkedIn (if available)
   - Location (optional)

2. Professional Summary:
   - 3–4 lines
   - Tailored to job description
   - Highlight key strengths and experience

3. Skills:
   - Categorized (e.g., Languages, Frameworks, Tools)
   - Include keywords from job description

4. Experience / Projects:
   - Use bullet points
   - Each point must:
     - Start with action verbs (Built, Developed, Optimized, etc.)
     - Include measurable impact where possible
     - Align with job requirements

5. Education

6. Additional Sections (if relevant):
   - Certifications
   - Achievements

----------------------------------------
ATS OPTIMIZATION RULES:

1. Include relevant keywords from the job description naturally
2. Avoid keyword stuffing
3. Use standard section headings (e.g., "Skills", "Experience")
4. Avoid images, icons, or complex layouts
5. Use simple fonts and formatting
6. Ensure content is machine-readable

----------------------------------------
QUALITY RULES:

1. Content must feel human-written, not AI-generated
2. Avoid generic phrases like "hardworking", "team player"
3. Be specific and concrete
4. Match tone to candidate experience level (fresher vs experienced)
5. Highlight real strengths from input data
6. content must be ATS friendly without loosing the information.
7. The resume should not be lengthy , try to finish it on 1 page or max 2 page, for fresher 1 page is ideal.

----------------------------------------
IMPORTANT:

- If candidate is a fresher, focus on projects, skills, and learning ability
- If experienced, emphasize impact and achievements
- Do NOT hallucinate unrealistic experience

----------------------------------------

Generate the resume now.`;
  let retries = 3;
  try {
    const response = await ai.models.generateContent({

      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: zodToJsonSchema(resumepdfSchema)
      }
    })

    const jsonContent = JSON.parse(response.text)

    const pdfBuffer = await generatePdfFromHTML(jsonContent.html)
    return pdfBuffer;
  } catch (error) {
    if (error.status === 503 && retries > 1) {
      console.log("Model busy... retrying");
      await new Promise((res) => setTimeout(res, 3000));
      retries--;
    }
    else if (error.status === 429) {
      throw new Error("Gemini quota exceeded 2. Try later.");
      retries--;
    } else {
      throw error;
    }
  }

}


module.exports = { generateInterviewReport, generateResumepdf };