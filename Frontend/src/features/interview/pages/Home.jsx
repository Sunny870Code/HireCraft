import React from "react";

const Home = () => {
    return (
        <main className="w-full min-h-screen bg-[#355872] flex items-center justify-center">
            <section className="w-full max-w-4xl aspect-[7.5/5] flex flex-col items-center justify-center 
             shadow-[0_20px_50px_rgba(0,0,0,0.35)] bg-[#7AAACE] gap-6 ">
                <div className="flex items-center gap-10 text-[#F7F8F0] ">
                    <div className="flex flex-col w-[50%] min-h-full border-2 border-dotted rounded-2xl p-5 gap-4">
                        <label className=" capitalize" htmlFor="jobDiscription">Job Description</label>
                        <textarea className="border px-2 py-1.5 w-full min-h-[100px] rounded-xl text-sm " name="jobDiscription" id="jobDiscription" placeholder="Enter job discription here..."></textarea>
                    </div>

                    <div className="flex flex-col w-[50%] border-2 border-dotted rounded-2xl p-5 gap-5">
                        <div className="">
                            <label className="capitalize" htmlFor="resume">upload resume</label>
                            <input className="px-4 mt-2 py-2 rounded-2xl text-[#546B41] bg-[#FFF8EC] active:scale-95 " type="file" name="resume" id="resume" accept=".pdf" />
                        </div>

                        <div className="flex flex-col">
                            <label className="capitalize" htmlFor="selfDescription">Self Description</label>
                            <textarea className="border mt-2 p-2 w-full rounded-xl text-sm" name="selfDescription" id="selfDescription" placeholder="Enter selfDescription here..."></textarea>
                        </div>
                    </div>
                </div>
                <div>
                    <button className="px-4 py-2 rounded-2xl text-[#546B41] bg-[#FFF8EC] active:scale-95 active:cursor-pointer">Generate</button>

                </div>

            </section>

        </main>
    )
}

export default Home;