import axios from "axios";


const api = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true,
})

/**
 * 
 * @description service to generate interview report based on the user self description , jon=b description, resume 
 * @returns 
 */

export const generateInterviewReport =  async({jobDescription ,selfDescription , resume}) =>{
    const formData = new FormData()
    formData.append("jobDescription",jobDescription)
    formData.append("selfDescription",selfDescription)
    formData.append("resume",resume)

    const response = await api.post("/api/interview",formData,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    })
    console.log('API Response:', response.data)
    return response.data
}

/**
 * 
 * @description service to get interview report by id
 */


export const getInterviewReportById = async (interviewId) =>{
    const response = await api.get(`/api/interview/report/${interviewId}`)

    return response.data
}


/**
 * 
 * @description service to get interview all interview report of logged in user
 */

export const getAllInterviewReport =async (interviewId) =>{
    const response = await api.get(`/api/interview/allreport`)

    return response.data
}

/**
 * 
 * @description  service to generate resume pdf based on user provided data
 * @returns 
 */

export const generateResumePdf = async ({interviewReportId}) =>{
    const response = await api.post(`/api/interview/resume/pdf/${interviewReportId}`,null,{
        responseType:"blob"
    })

    return response.data
}