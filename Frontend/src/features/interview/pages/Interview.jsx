import React, { useState, useEffect } from 'react';
import {
    FileText, MessageSquare, BookOpen, AlertCircle,
    CheckCircle2, Target, Briefcase, GraduationCap, Map
} from 'lucide-react';

import { useInterview } from '../hook/useInterview';
import { useNavigate, useParams } from 'react-router';
import Navbar from '../../auth/pages/Navbar';
Navbar

const InterviewDashboard = () => {
    const [activeTab, setActiveTab] = useState('roadmap');
    const { report, loading, getReportById, getResumePdf } = useInterview();
    const { interviewId } = useParams()


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FFF8EC]">
                <div className="text-[#546B41] text-xl">Loading report...</div>
            </div>
        );
    }

    if (!report) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FFF8EC]">
                <div className="text-[#546B41] text-xl">No report found</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex font-sans" style={{ backgroundColor: '#FFF8EC', color: '#546B41' }}>
            <Navbar />

            {/* LEFT MENU */}
            <nav className="w-72 border-r border-stone-200 p-6 flex flex-col gap-2 h-screen justify-between">
                <div>
                    <div className="mb-10">
                        <h2 className="text-xs uppercase tracking-widest opacity-60 font-bold mb-4">Interview Analysis</h2>
                        <div className="flex items-center gap-2 text-xl font-bold">
                            <Target size={24} />
                            <span>Score: {report.matchScore}%</span>
                        </div>
                        <div className="w-full bg-stone-200 h-2 mt-2 rounded-full overflow-hidden">
                            <div className="h-full bg-[#546B41]" style={{ width: `${report.matchScore}%` }}></div>
                        </div>
                    </div>

                    <button onClick={() => setActiveTab('roadmap')} className={`flex items-center gap-3 p-3 rounded-lg transition-all ${activeTab === 'roadmap' ? 'bg-[#546B41] text-[#FFF8EC]' : 'hover:bg-stone-200'}`}>
                        <Map size={20} /> <span className="font-medium text-sm">Preparation Roadmap</span>
                    </button>

                    <button onClick={() => setActiveTab('resume')} className={`flex items-center gap-3 p-3 rounded-lg transition-all ${activeTab === 'resume' ? 'bg-[#546B41] text-[#FFF8EC]' : 'hover:bg-stone-200'}`}>
                        <FileText size={20} /> <span className="font-medium text-sm">Resume & JD</span>
                    </button>

                    <button onClick={() => setActiveTab('technical')} className={`flex items-center gap-3 p-3 rounded-lg transition-all ${activeTab === 'technical' ? 'bg-[#546B41] text-[#FFF8EC]' : 'hover:bg-stone-200'}`}>
                        <BookOpen size={20} /> <span className="font-medium text-sm">Technical Questions</span>
                    </button>

                    <button onClick={() => setActiveTab('behavioral')} className={`flex items-center gap-3 p-3 rounded-lg transition-all ${activeTab === 'behavioral' ? 'bg-[#546B41] text-[#FFF8EC]' : 'hover:bg-stone-200'}`}>
                        <MessageSquare size={20} /> <span className="font-medium text-sm">Behavioral Ques.</span>
                    </button>
                </div>


                <button
                    onClick={() => { getResumePdf(report._id) }}
                    className='bg-[#546B41] text-[#FFF8EC] px-4 py-2 rounded-2xl active:scale-95 active:cursor-pointer'>Download Resume</button>
            </nav>

            {/* MID CONTENT */}
            <main className="flex-1 p-10 overflow-y-auto">
                <div className="max-w-3xl">

                    {/* TAB: ROADMAP */}
                    {activeTab === 'roadmap' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center justify-between border-b border-stone-300 pb-4">
                                <h2 className="text-2xl font-bold uppercase tracking-tight">Preparation Roadmap</h2>
                                <span className="bg-[#546B41] text-[#FFF8EC] px-4 py-1 rounded-full text-xs font-bold">
                                    5 DAY PATHWAY
                                </span>
                            </div>

                            <div className="space-y-0">
                                {report.preparationPlan.map((step, index) => {
                                    // This logic splits "Day 1: Description..." into two parts
                                    const parts = step.split(':');
                                    const dayLabel = parts[0]; // "Day 1"
                                    const description = parts.slice(1).join(':').trim(); // "Deep dive into..."

                                    return (
                                        <div key={index} className="flex gap-6 group">
                                            {/* The Timeline Visual Line */}
                                            <div className="flex flex-col items-center">
                                                <div className="w-12 h-12 rounded-full bg-[#546B41] text-[#FFF8EC] flex items-center justify-center font-bold flex-shrink-0 z-10 shadow-md transition-transform group-hover:scale-110">
                                                    {index + 1}
                                                </div>
                                                {index !== report.length - 1 && (
                                                    <div className="w-0.5 h-full bg-stone-300 -mt-2 mb-2"></div>
                                                )}
                                            </div>

                                            {/* The Content Card */}
                                            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex-1 mb-8 hover:border-[#546B41] transition-all hover:shadow-md">
                                                <h3 className="font-black text-[#546B41] uppercase text-xs mb-2 tracking-widest opacity-70">
                                                    {dayLabel}
                                                </h3>
                                                <p className="text-lg font-medium text-stone-800 leading-relaxed">
                                                    {description}
                                                </p>

                                                {/* Optional: Add a small badge if it's the final day */}
                                                {index === 4 && (
                                                    <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-800 rounded-md text-xs font-bold uppercase">
                                                        <Target size={14} /> Final Review
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* TAB: RESUME & JD */}
                    {activeTab === 'resume' && (
                        <div className="space-y-8 animate-in fade-in duration-300">
                            <section>
                                <h2 className="flex items-center gap-2 text-lg font-bold mb-4 uppercase text-[#546B41]"><Briefcase size={18} /> Job Description</h2>
                                <div className="bg-white/50 p-6 rounded-xl border border-stone-200 text-sm leading-relaxed whitespace-pre-line">
                                    {report.jobDescription}
                                </div>
                            </section>
                            <section>
                                <h2 className="flex items-center gap-2 text-lg font-bold mb-4 uppercase text-[#546B41]"><GraduationCap size={18} /> Resume Content</h2>
                                <div className="bg-white/50 p-6 rounded-xl border border-stone-200 text-sm font-mono whitespace-pre-line">
                                    {report.resume}
                                </div>
                            </section>
                        </div>
                    )}

                    {/* TAB: TECHNICAL QUESTIONS */}
                    {activeTab === 'technical' && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold mb-6 text-[#546B41]">Technical Interview Questions</h2>
                            {report.technicalQuestions.map((q, i) => (
                                <div key={i} className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm hover:border-[#546B41] transition-all">
                                    <div className="flex gap-4">
                                        <span className="bg-[#546B41] text-[#FFF8EC] w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                                            {i + 1}
                                        </span>
                                        <p className="text-lg leading-snug">{q}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* TAB: BEHAVIORAL QUESTIONS */}
                    {activeTab === 'behavioral' && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold mb-6 text-[#546B41]">Behavioral Scenarios (STAR Method)</h2>
                            {report.behavioralQuestion.map((q, i) => (
                                <div key={i} className="bg-white/70 p-6 rounded-xl border border-stone-200 flex items-start gap-4 hover:shadow-md transition-shadow">
                                    <MessageSquare className="text-[#546B41] mt-1 flex-shrink-0" size={24} />
                                    <p className="text-lg leading-relaxed">{q}</p>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </main>

            {/* RIGHT SIDEBAR: SKILL GAP */}
            <aside className="w-80 border-l border-stone-200 p-8 bg-stone-50/50">
                <div className="flex items-center gap-2 mb-8 text-red-700">
                    <AlertCircle size={22} />
                    <h2 className="text-xs font-black uppercase tracking-widest">Skill Gaps</h2>
                </div>
                <div className="space-y-3">
                    {report.skillGap.map((gap, i) => (
                        <div key={i} className="p-3 bg-red-50 border border-red-100 rounded-lg text-red-900 text-sm font-medium">
                            • {gap}
                        </div>
                    ))}
                </div>
                <div className="mt-12 p-5 bg-[#546B41] rounded-2xl text-[#FFF8EC]">
                    <p className="text-xs font-bold uppercase opacity-80 mb-2">Interview Tip:</p>
                    <p className="text-sm italic leading-relaxed font-light">
                        "Relate your 50+ LeetCode problems to real-world performance optimization in your Music Streaming project."
                    </p>
                </div>
            </aside>

        </div>
    );
};

export default InterviewDashboard;