
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../services/auth.context";
import { useAuth } from "../hooks/useAuth";


const Navbar = () => {
    
    const [showNav, setShowNav] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const {user, setuser, loading} = useContext(AuthContext)
    const {handleLogout} = useAuth()

    const navigate = useNavigate();

    const handleLogoutButton = async (e) => {
        // Call your logout API here
        await handleLogout();
        navigate("/login");
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                // scrolling down
                setShowNav(false);
            } else {
                // scrolling up
                setShowNav(true);
            }
            setLastScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300
      ${showNav ? "translate-y-0" : "-translate-y-full"}
      bg-transparent backdrop-blur-md border-b border-white/20 shadow-sm`}
        >
            <div className="flex justify-between items-center p-6">
                {/* <div className="text-xl font-bold text-blue-500 text-2xl">InterviewAI</div> */}
                <Link to="/">
                    <h1
                        className="text-3xl font-bold"
                        style={{
                            color: "transparent",
                            WebkitTextStroke: "1px #3b82f6",
                        }}

                    >
                        InterviewAI
                    </h1>
                </Link>


                <div className="space-x-4">
                    {!user ? (
                        <>
                            <Link to="/login">
                                <button className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200">
                                    Login
                                </button>
                            </Link>

                            <Link to="/register">
                                <button className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200">
                                    Register
                                </button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/home">
                                <button className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200">
                                    Resume
                                </button>
                            </Link>
                            <button
                                onClick={handleLogoutButton }
                                className="px-4 py-2 border border-red-400 text-red-400 rounded-md hover:bg-red-500 hover:text-white active:scale-95">
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;