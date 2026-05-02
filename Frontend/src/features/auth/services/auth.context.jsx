import { createContext, useState, useEffect } from "react";
import { getMe } from "./auth.api";

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [user, setuser] = useState(null)
    const [loading, setLoading] = useState(true)

    // useEffect(() => {
    //     const getAndSetUser = async () => {

    //         try {
    //             const data = await getMe();
    //             setuser(data.user)
    //         } catch (err) {
    //             setuser(null);
    //         } finally {
    //             setLoading(false);
    //         }
    //     }

    //     getAndSetUser();
    // }, [])

    useEffect(() => {

        const getAndSetUser = async () => {
            try {
                const data = await getMe();
                if (data && data.user) {
                    setuser(data.user);
                }
            } catch (err) {
                // 401 is normal if not logged in; just keep user as null
                if (err.response?.status !== 401) {
                    console.error("Auth check error:", err);
                }
                setuser(null);
            } finally {
                setLoading(false); 
            }
        };

        getAndSetUser();
    }, [])

    return (
        <AuthContext.Provider value={{ user, setuser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    )

}