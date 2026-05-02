const express =  require("express");
/* rerquire all the routes here */
const authRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes");
const cookieParser = require("cookie-parser")
const cors = require("cors");

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174","http://localhost:3000", "https://hire-craft-five.vercel.app"],
  credentials: true
}));


app.use(express.json());
app.use(cookieParser())

/* using all the routes here  */
app.use("/api/auth",authRouter)
app.use("/api/interview",interviewRouter)



module.exports = app;