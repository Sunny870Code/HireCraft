import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const LogIn = () => {
    const navigate = useNavigate();

    //using custom hook
    const {loading , handleLogin} = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit =async(e)=>{
        e.preventDefault();
        await handleLogin(formData)
    }

    if(loading){
        return (<main><h1>Loading...</h1></main>)
    }

    return (
        <main>
            <div className="w-full min-h-screen bg-[#FFF8EC] flex items-center justify-center">
                <div className="w-full max-w-4xl aspect-[7.5/5] flex  
             shadow-[0_20px_50px_rgba(0,0,0,0.35)] ">

                    {/* left window */}
                    <div className="bg-[#FFF8EC] h-full w-full p-6 ">
                        <h1 className="text-2xl font-semibold  mb-6 text-[#546B41]">GenAi Parser</h1>
                        <div className="w-[80%] m-auto">
                            <div>
                                <h1 className="text-2xl font-semibold  mb-6">LogIn </h1>
                            </div>
                            <form
                                className="flex flex-col gap-2"
                                action=""
                                onSubmit={handleSubmit}>

                                <label className=" text-sm">
                                    Email
                                </label>
                                <input type="email"
                                    name="email"
                                    onChange={handleChange}
                                    value={formData.email}
                                    required
                                    placeholder="Enter email"
                                    className="border px-2 py-1.5 rounded-xl text-sm" />

                                <label className=" text-sm">
                                    Password
                                </label>
                                <input type="password"
                                    name="password"
                                    onChange={handleChange}
                                    value={formData.password}
                                    required
                                    placeholder="Enter password"
                                    className="border px-2 py-1.5 rounded-xl text-sm mb-4" />

                                <div className="text-right">
                                    <Link to="/" className="text-sm text-[#546B41] font-semibold hover:underline">
                                        Forgot password?
                                    </Link>
                                </div>

                                <button
                                    type="submit"
                                    className="bg-[#546B41]  p-3 mt-4 rounded-2xl text-[#FFF8EC]">
                                    LogIn
                                </button>
                            </form>
                            <p className="mt-6 text-sm ">Create a new account?<Link to={"/register"} className="text-[#546B41] font-semibold hover:underline "> Register</Link> </p>

                        </div>
                    </div>

                    {/* right window */}
                    <div className="bg-[#546B41] h-full w-full flex flex-col items-center justify-center p-8 gap-8">
                        <div className="flex items-center">
                            <h2 className="text-[#FFF8EC]">Features</h2>
                        </div>

                        <div className="w-[80%] m-auto flex flex-col gap-4">

                            <div className="w-full aspect-[7/5]">
                                <img
                                    src="https://picsum.photos/400/300"
                                    alt="Not found"
                                    className="w-full h-full object-cover rounded-lg" />
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-[#FFF8EC] mb-2">Fast performance</h3>
                                <p className="text-xs text-[#FFF8EC] ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci cumque facere explicabo sunt accusamus necessitatibus quis, temporibus ullam quibusdam. Neque perferendis deserunt quam voluptatibus blanditiis ipsum quibusdam provident vel laboriosam?</p>
                            </div>


                        </div>

                    </div>

                </div>

            </div>

        </main>

    )
}

export default LogIn;