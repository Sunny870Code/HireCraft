// import React, { useState } from "react";
// import { useInterview } from "../hook/useInterview";
// import { useNavigate } from "react-router";

// const Home = () => {
//     const { loading, generateReport, reports } = useInterview();
//     const navigate = useNavigate();

//     // 1. Initialize state for two-way binding
//     const [formData, setFormData] = useState({
//         jobDescription: "",
//         selfDescription: "",
//         resume: null,
//     });


//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };


//     const handleFileChange = (e) => {
//         setFormData((prev) => ({
//             ...prev,
//             resume: e.target.files[0],
//         }));
//     };


//     // const handleSubmit = async (e) => {
//     //     e.preventDefault();


//     //     const result = await generateReport(formData);
//     //     console.log(result)
//     //     if (result) {
//     //         navigate(`/interview/${result._id}`);
//     //     } else {
//     //         alert("Failed to generate report");
//     //     }

//     // };
// const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//         const result = await generateReport(formData);
//         console.log('Submit result:', result);

//         if (result) {
//             // Check which ID field exists
//             const reportId = result._id || result.id;

//             if (reportId) {
//                 console.log("hello")
//                 navigate(`/interview/${reportId}`);
//             } else {
//                 console.error('No ID in result:', result);
//                 alert("Report generated but missing ID");
//             }
//         } else {
//             alert("Failed to generate report");
//         }
//     } catch (error) {
//         console.error('Submit error:', error);
//         alert("Error: " + error.message);
//     }
// };
//     return (
//         <main className="w-full min-h-screen bg-[#355872] flex items-center justify-center">
//             <section className="w-full max-w-4xl aspect-[7.5/5] flex flex-col items-center justify-center 
//              shadow-[0_20px_50px_rgba(0,0,0,0.35)] bg-[#7AAACE] gap-6 ">

//                 <div className="flex items-center gap-10 text-[#F7F8F0] ">
//                     {/* Job Description Binding */}
//                     <div className="flex flex-col w-[50%] min-h-full border-2 border-dotted rounded-2xl p-5 gap-4">
//                         <label className=" capitalize" htmlFor="jobDescription">Job Description</label>
//                         <textarea
//                             className="border px-2 py-1.5 w-full min-h-[100px] rounded-xl text-sm text-black"
//                             name="jobDescription"
//                             id="jobDescription"
//                             placeholder="Enter job description here..."
//                             value={formData.jobDescription}
//                             onChange={handleChange}
//                         ></textarea>
//                     </div>

//                     <div className="flex flex-col w-[50%] border-2 border-dotted rounded-2xl p-5 gap-5">
//                         {/* Resume Binding */}
//                         <div className="">
//                             <label className="capitalize" htmlFor="resume">upload resume</label>
//                             <input
//                                 className="px-4 mt-2 py-2 rounded-2xl text-[#546B41] bg-[#FFF8EC] active:scale-95 w-full"
//                                 type="file"
//                                 name="resume"
//                                 id="resume"
//                                 accept=".pdf"
//                                 onChange={handleFileChange}
//                             />
//                         </div>

//                         {/* Self Description Binding */}
//                         <div className="flex flex-col">
//                             <label className="capitalize" htmlFor="selfDescription">Self Description</label>
//                             <textarea
//                                 className="border mt-2 p-2 w-full rounded-xl text-sm text-black"
//                                 name="selfDescription"
//                                 id="selfDescription"
//                                 placeholder="Enter selfDescription here..."
//                                 value={formData.selfDescription}
//                                 onChange={handleChange}
//                             ></textarea>
//                         </div>
//                     </div>
//                 </div>

//                 <div>
//                     <button
//                         onClick={handleSubmit}
//                         disabled={loading}
//                         className="px-6 py-2 rounded-2xl text-[#546B41] bg-[#FFF8EC] active:scale-95 active:cursor-pointer font-bold disabled:opacity-50 disabled:scale-100"
//                     >
//                         {loading ? "Generating..." : "Generate Report"}
//                     </button>
//                 </div>

//             </section>

//             {/* Add a section to show existing reports fetched by useEffect */}
//             <section className="existing-reports">
//                 {reports && reports.length > 0 && reports.map(rep => (
//                     <div key={rep._id}>{rep.title}</div>
//                 ))}
//             </section>
//         </main>
//     );
// };

// export default Home;




import React, { useState } from "react";
import { useInterview } from "../hook/useInterview";
import { useNavigate } from "react-router";
import { Upload, FileText, User, Sparkles } from "lucide-react";
import Navbar from "../../auth/pages/Navbar";
import { useAuth } from "../../auth/hooks/useAuth";


const Home = () => {
    const { loading, generateReport, reports } = useInterview();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        jobDescription: "",
        selfDescription: "",
        resume: null,
    });

    const [fileName, setFileName] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({
            ...prev,
            resume: file,
        }));
        setFileName(file ? file.name : "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert("Please login first to generate a report");
            navigate('/login');
            return;
        }

        try {
            const result = await generateReport(formData);
            console.log('Submit result:', result);

            if (result) {
                const reportId = result._id || result.id;

                if (reportId) {
                    navigate(`/interview/${reportId}`);
                } else {
                    console.error('No ID in result:', result);
                    alert("Report generated but missing ID");
                }
            } else {
                alert("Failed to generate report");
            }
        } catch (error) {
            console.error('Submit error:', error);
            alert("Error: " + error.message);
        }
    };


    return (

        <div>
            <Navbar />
            <main className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-6">

                <div className="w-full max-w-6xl">

                    {/* Header Section */}
                    <div className="text-center mb-8 animate-fade-in">
                        <div className="inline-flex items-center gap-2 mb-4">
                            <Sparkles className="text-indigo-600 animate-pulse" size={28} />
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                                GenAI Interview Analyzer
                            </h1>
                        </div>
                        <p className="text-slate-600 text-lg">Transform your interview prep with AI-powered insights</p>
                    </div>

                    {/* Main Card */}
                    <section className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 transition-all duration-300 hover:shadow-indigo-200/50">

                        <div className="grid md:grid-cols-2 gap-6 mb-8">

                            {/* Job Description Section */}
                            <div className="group">
                                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border-2 border-indigo-100 transition-all duration-300 hover:border-indigo-300 hover:shadow-lg">
                                    <div className="flex items-center gap-2 mb-4">
                                        <FileText className="text-indigo-600" size={20} />
                                        <label className="text-lg font-semibold text-slate-800" htmlFor="jobDescription">
                                            Job Description
                                        </label>
                                    </div>
                                    <textarea
                                        className="w-full min-h-[160px] px-4 py-3 rounded-xl border-2 border-slate-200 
                                    focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none 
                                    transition-all duration-200 resize-none bg-white text-slate-800
                                    placeholder:text-slate-400"
                                        name="jobDescription"
                                        id="jobDescription"
                                        placeholder="Paste the job description here..."
                                        value={formData.jobDescription}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6">

                                {/* Resume Upload */}
                                <div className="group">
                                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-100 transition-all duration-300 hover:border-blue-300 hover:shadow-lg">
                                        <div className="flex items-center gap-2 mb-4">
                                            <Upload className="text-blue-600" size={20} />
                                            <label className="text-lg font-semibold text-slate-800" htmlFor="resume">
                                                Upload Resume
                                            </label>
                                        </div>

                                        <div className="relative">
                                            <input
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                type="file"
                                                name="resume"
                                                id="resume"
                                                accept=".pdf"
                                                onChange={handleFileChange}
                                            />
                                            <div className="bg-white border-2 border-dashed border-blue-300 rounded-xl p-4 
                                        hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 cursor-pointer
                                        flex items-center justify-center gap-3">
                                                <Upload className="text-blue-500" size={20} />
                                                <span className="text-slate-700 font-medium">
                                                    {fileName || "Choose PDF file"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Self Description */}
                                <div className="group">
                                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border-2 border-purple-100 transition-all duration-300 hover:border-purple-300 hover:shadow-lg">
                                        <div className="flex items-center gap-2 mb-4">
                                            <User className="text-purple-600" size={20} />
                                            <label className="text-lg font-semibold text-slate-800" htmlFor="selfDescription">
                                                About Yourself
                                            </label>
                                        </div>
                                        <textarea
                                            className="w-full min-h-[100px] px-4 py-3 rounded-xl border-2 border-slate-200 
                                        focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none 
                                        transition-all duration-200 resize-none bg-white text-slate-800
                                        placeholder:text-slate-400"
                                            name="selfDescription"
                                            id="selfDescription"
                                            placeholder="Tell us about your background and experience..."
                                            value={formData.selfDescription}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="group relative px-8 py-4 rounded-2xl font-bold text-lg
                            bg-gradient-to-r from-indigo-600 to-blue-600 text-white
                            shadow-lg shadow-indigo-300/50
                            hover:shadow-xl hover:shadow-indigo-400/50 hover:scale-105
                            active:scale-95
                            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                            transition-all duration-300 overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Analyzing...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles size={20} />
                                            Generate Analysis
                                        </>
                                    )}
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                        </div>
                    </section>

                    {/* Existing Reports (if needed) */}
                    {reports && reports.length > 0 && (
                        <section className="mt-6 animate-fade-in">
                            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                                <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Reports</h3>
                                <div className="grid gap-3">
                                    {reports.map(rep => (
                                        <div key={rep._id} className="p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-slate-200 hover:border-indigo-300 transition-all duration-200">
                                            {rep.title}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}
                </div>

                <style>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out;
                }
            `}</style>
            </main>

        </div>

    );
};

export default Home;
