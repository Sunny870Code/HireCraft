
import { useState } from "react"
import { getAllInterviewReport, generateInterviewReport, getInterviewReportById ,generateResumePdf} from "../services/interview.api"
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

    const getResumePdf = async (interviewReportId) =>{
        setLoading(true)
        let response = null;
        try{
            response = await generateResumePdf({interviewReportId})
            const url = window.URL.createObjectURL(new Blob([response], {type:"application/pdf"}))
            const link = document.createElement("a")
            link.href = url;
            link.setAttribute("download",`resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
        } catch (error){
            console.log(error)
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

    return { loading, report, reports, generateReport, getReportById, getReports,getResumePdf  }
}