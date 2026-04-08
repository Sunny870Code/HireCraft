import { createContext, useState, useEffect } from "react";
import { getMe } from "./auth.api";

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [user, setuser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getAndSetUser = async () => {

            try {
                const data = await getMe();
                setuser(data.user)
            } catch (err) {
                setuser(null);
            } finally {
                setLoading(false);
            }
        }

        getAndSetUser();
    }, [])

    return (
        <AuthContext.Provider value={{ user, setuser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    )

}