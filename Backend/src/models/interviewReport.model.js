const mongoose = require("mongoose");

/**
 * - job description schema :String
 * -resume text :String
 * - self description :String
 * 
 * 
 * Match score : Number
 * 
 * technical question: 
 *      [{
 *          question: "",
 *          intention:"",
 *          answer:"",
 *      }]
 * -Behavioural question:
 *        [{
 *          question: "",
 *          intention:"",
 *          answer:"",
 *      }]
 * -skill gaps:[{
 *          skill:"",
 *          severity:"",
 *          type: String,
 *          enum: ["low","medium","high"]
 *          }]
 * -preperation plan: 
 *          [
 *          {
 *           day :Number,
 *           focus:String,
 *           tasks:[String]        
 *          }]
 * 
 */


const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Technical question is requried"]

    },
    intention: {
        type: String,
        required: [true, "Intention is requied"]
    },
    answer: {
        type: String,
        required: [true, "Answer is reqiured"]
    }
}, {
    _id: false
})


const behaviouralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Technical question is requried"]

    },
    intention: {
        type: String,
        required: [true, "Intention is requied"]
    },
    answer: {
        type: String,
        required: [true, "Answer is reqiured"]
    }
}, {
    _id: false
})


const skillgapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, "Technical question is requried"]

    },
    severity: {
        type: String,
        enum: ["low", "medium", "high"],
        required: [true, "Intention is requied"]
    }
}, {
    _id: false
})

const preperationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, "Day is requied"]
    },
    focus: {
        type: String,
        required: [true, "Focus is requied"]
    },
    tasks: {
        type: String,
        tasks: [{
            type: String,
            required: [true, "Tasks are requied"]

        }]
    }
})



const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: true,
    },
    resume: {
        type: String,
    },

    selfDescription: {
        type: String,
    },
    matchScorer: {
        type: Number,
        min: 0,
        max: 100,
    },

    technicalQuestions: [technicalQuestionSchema],
    behaviouralQuestion: [behaviouralQuestionSchema],
    skillGaps: [skillgapSchema],
    preperationPlan: [preperationPlanSchema]

},
    {
        timestamps: true
    }
)

const interviewReportModel = mongoose.model("InterviewReport", interviewReportSchema);

module.export = interviewReportModel;

