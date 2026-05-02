require("dotenv").config()
const app = require("./src/app")
const connectDB = require("./src/config/database")
const {generateInterviewReport} = require("./src/services/ai.service")
const {resume ,selfDescription, jobDescription } = require("./src/services/temp");
const cors = require('cors');

app.use(cors({
    origin: "https://hire-craft-five.vercel.app", // Your exact Vercel URL from the logs
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

connectDB();

generateInterviewReport({resume, selfDescription,jobDescription})

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})

