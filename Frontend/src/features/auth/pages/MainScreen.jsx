import { Link, useNavigate } from "react-router-dom";
// Assuming you have an AuthContext or similar to check login status
import { useContext } from "react"; 
import { AuthContext } from "../services/auth.context";
import { useAuth } from "../hooks/useAuth";
import Navbar from "./Navbar";


export const Home = () => {


    return (
        <div className="min-h-screen bg-gray-50 animate-fade-in flex justify-center items-center">
            {/* 1. Use the style block correctly to avoid ReferenceErrors */}
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 0.6s ease-out; }
            `}</style>

            <Navbar />

            <main className="text-center mt-20">
                <h1 className="text-4xl font-bold">Welcome , to AI Resume creater</h1>
                <p className="mt-4 text-gray-600">Prepare, Practice, and Succeed.</p>
            </main>
        </div>
    );
};

export default Home