// import { useState } from "react"
// import { getAllInterviewReport, generateInterviewReport, getInterviewReportById } from "../services/interview.api"
// import { useContext, useEffect } from "react"
// import { InterviewContext } from "../services/interview.context"
// import { useParams } from "react-router"


// export const useInterview = () => {
//     const context = useContext(InterviewContext)
//     const { interviewId } = useParams()


//     const { loading, setLoading, report, setReport, reports, setReports } = context


//     if (!context) {
//         throw new Error("useInterview must be used within an InteviewProvider")
//     }


//     const generateReport = async ({ jobDescription, selfDescription, resume }) => {
//         setLoading(true)
//         try {
//             const response = await generateInterviewReport({ jobDescription, selfDescription, resume })
//             setReport(response.interviewReport)
//             console.log(response.interviewReport)
//             return response.interviewReport
//         } catch (error) {
//             console.log(error)
//             return null
//         } finally {
//             setLoading(false)
//         }
//     }

//     const getReportById = async (interviewId) => {
//         setLoading(true)
//         try {
//             const response = await getInterviewReportById(interviewId)
//             setReport(response)
//         } catch (error) {
//             console.log(error)
//         } finally {
//             setLoading(false)
//         }
//     }

//     const getReports = async () => {
//         setLoading(true)
//         try {
//             const response = await getAllInterviewReport()
//             setReports(response.interviewReport)
//         } catch (error) {
//             console.log(error)
//         } finally {
//             setLoading(false)
//         }

//     }

//     // useEffect(() => {
//     //     if (interviewId) {
//     //         getReportById(interviewId)
//     //     }
//     //     else {
//     //         getReports()
//     //     }
//     // }, [interviewId])

//     return { loading, report, reports, generateReport, getReportById, getReports }
// }



import { useState } from "react"
import { getAllInterviewReport, generateInterviewReport, getInterviewReportById } from "../services/interview.api"
import { useContext, useEffect } from "react"
import { InterviewContext } from "../services/interview.context"
import { useParams } from "react-router"


export const useInterview = () => {
    const context = useContext(InterviewContext)
    const { interviewId } = useParams()

    if (!context) {
        throw new Error("useInterview must be used within an InteviewProvider")
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context

    const generateReport = async ({ jobDescription, selfDescription, resume }) => {
        setLoading(true)
        try {
            const response = await generateInterviewReport({ jobDescription, selfDescription, resume })
            const reportData = response.interviewReport || response
            setReport(reportData)
            console.log('Generated report:', reportData)
            return reportData
        } catch (error) {
            console.error('Generate report error:', error)
            return null
        } finally {
            setLoading(false)
        }
    }

    const getReportById = async (interviewId) => {
        setLoading(true)
        try {
            const response = await getInterviewReportById(interviewId)
            const reportData = response.interviewReport || response
            setReport(reportData)
            return reportData
        } catch (error) {
            console.error('Get report by ID error:', error)
            return null
        } finally {
            setLoading(false)
        }
    }

    const getReports = async () => {
        setLoading(true)
        try {
            const response = await getAllInterviewReport()
            const reportsData = response.interviewReport || response
            setReports(Array.isArray(reportsData) ? reportsData : [])
            return reportsData
        } catch (error) {
            console.error('Get all reports error:', error)
            setReports([])
            return []
        } finally {
            setLoading(false)
        }
    }

    // Load data based on route
    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        } 
    }, [interviewId])

    return { loading, report, reports, generateReport, getReportById, getReports }
}