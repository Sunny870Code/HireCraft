import React, { useState } from "react";
import { useInterview } from "../hook/useInterview";
import { useNavigate } from "react-router";

const Home = () => {
    const { loading, generateReport } = useInterview();
    const navigate = useNavigate();

    // 1. Initialize state for two-way binding
    const [formData, setFormData] = useState({
        jobDescription: "",
        selfDescription: "",
        resume: null,
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleFileChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            resume: e.target.files[0],
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        
        const result = await generateReport(formData);
        console.log(result)
        if (result) {
            navigate("/main");
        } else {
            alert("Failed to generate report");
        }

    };

    return (
        <main className="w-full min-h-screen bg-[#355872] flex items-center justify-center">
            <section className="w-full max-w-4xl aspect-[7.5/5] flex flex-col items-center justify-center 
             shadow-[0_20px_50px_rgba(0,0,0,0.35)] bg-[#7AAACE] gap-6 ">

                <div className="flex items-center gap-10 text-[#F7F8F0] ">
                    {/* Job Description Binding */}
                    <div className="flex flex-col w-[50%] min-h-full border-2 border-dotted rounded-2xl p-5 gap-4">
                        <label className=" capitalize" htmlFor="jobDescription">Job Description</label>
                        <textarea
                            className="border px-2 py-1.5 w-full min-h-[100px] rounded-xl text-sm text-black"
                            name="jobDescription"
                            id="jobDescription"
                            placeholder="Enter job description here..."
                            value={formData.jobDescription}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div className="flex flex-col w-[50%] border-2 border-dotted rounded-2xl p-5 gap-5">
                        {/* Resume Binding */}
                        <div className="">
                            <label className="capitalize" htmlFor="resume">upload resume</label>
                            <input
                                className="px-4 mt-2 py-2 rounded-2xl text-[#546B41] bg-[#FFF8EC] active:scale-95 w-full"
                                type="file"
                                name="resume"
                                id="resume"
                                accept=".pdf"
                                onChange={handleFileChange}
                            />
                        </div>

                        {/* Self Description Binding */}
                        <div className="flex flex-col">
                            <label className="capitalize" htmlFor="selfDescription">Self Description</label>
                            <textarea
                                className="border mt-2 p-2 w-full rounded-xl text-sm text-black"
                                name="selfDescription"
                                id="selfDescription"
                                placeholder="Enter selfDescription here..."
                                value={formData.selfDescription}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                    </div>
                </div>

                <div>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-6 py-2 rounded-2xl text-[#546B41] bg-[#FFF8EC] active:scale-95 active:cursor-pointer font-bold disabled:opacity-50 disabled:scale-100"
                    >
                        {loading ? "Generating..." : "Generate Report"}
                    </button>
                </div>

            </section>
        </main>
    );
};

export default Home;