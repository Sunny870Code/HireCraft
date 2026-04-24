// const mongoose = require("mongoose");

// /**
//  * - job description schema :String
//  * -resume text :String
//  * - self description :String
//  * 
//  * 
//  * Match score : Number
//  * 
//  * technical question: 
//  *      [{
//  *          question: "",
//  *          intention:"",
//  *          answer:"",
//  *      }]
//  * -Behavioural question:
//  *        [{
//  *          question: "",
//  *          intention:"",
//  *          answer:"",
//  *      }]
//  * -skill gaps:[{
//  *          skill:"",
//  *          severity:"",
//  *          type: String,
//  *          enum: ["low","medium","high"]
//  *          }]
//  * -preperation plan: 
//  *          [
//  *          {
//  *           day :Number,
//  *           focus:String,
//  *           tasks:[String]        
//  *          }]
//  * 
//  */


// const technicalQuestionSchema = new mongoose.Schema({
//     question: {
//         type: String,
//         required: [true, "Technical question is requried"]

//     },
//     intention: {
//         type: String,
//         required: [true, "Intention is requied"]
//     },
//     answer: {
//         type: String,
//         required: [true, "Answer is reqiured"]
//     }
// }, {
//     _id: false
// })


// const behavioralQuestionSchema = new mongoose.Schema({
//     question: {
//         type: String,
//         required: [true, "Technical question is requried"]

//     },
//     intention: {
//         type: String,
//         required: [true, "Intention is requied"]
//     },
//     answer: {
//         type: String,
//         required: [true, "Answer is reqiured"]
//     }
// }, {
//     _id: false
// })


// const skillgapSchema = new mongoose.Schema({
//     skill: {
//         type: String,
//         required: [true, "Technical question is requried"]

//     },
//     severity: {
//         type: String,
//         enum: ["low", "medium", "high"],
//         required: [true, "Intention is requied"]
//     }
// }, {
//     _id: false
// })

// const preperationPlanSchema = new mongoose.Schema({
//     day: {
//         type: Number,
//         required: [true, "Day is requied"]
//     },
//     focus: {
//         type: String,
//         required: [true, "Focus is requied"]
//     },
//     tasks: {
//         type: String,
//         required: [true, "Tasks are requied"]
//     }
// })



// const interviewReportSchema = new mongoose.Schema({
//     jobDescription: {
//         type: String,
//         required: true,
//     },
//     resume: {
//         type: String,
//     },

//     selfDescription: {
//         type: String,
//     },
//     matchScore: {
//         type: Number,
//         min: 0,
//         max: 100,
//         required:true
//     },

//     technicalQuestions: [technicalQuestionSchema],
//     behavioralQuestion: [behavioralQuestionSchema],
//     skillGap: [skillgapSchema],
//     preparationPlan: [preperationPlanSchema],
//     user:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"users"
//     }

// },
//     {
//         timestamps: true
//     }
// )

// const interviewReportModel = mongoose.model("InterviewReport", interviewReportSchema);

// module.exports = interviewReportModel;

const mongoose = require("mongoose");

const interviewReportSchema = new mongoose.Schema(
{
  jobDescription: {
    type: String,
    required: true
  },

  resume: {
    type: String,
    required: true
  },

  selfDescription: {
    type: String,
    required: true
  },

  matchScore: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },

  technicalQuestions: [
    {
      type: String
    }
  ],

  behavioralQuestion: [
    {
      type: String
    }
  ],

  skillGap: [
    {
      type: String
    }
  ],

  preparationPlan: [
    {
      type: String
    }
  ],

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  }

},
{
  timestamps: true
}
);

const interviewReportModel = mongoose.model(
  "InterviewReport",
  interviewReportSchema
);

module.exports = interviewReportModel;

