import { useContext, useEffect } from "react";
import { AuthContext } from "../services/auth.context";
import { login, register, logout, getMe } from "../services/auth.api";




export function useAuth() {
    const context = useContext(AuthContext);
    const { user, setuser, loading, setLoading } = context;

    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            const data = await login({ email, password });
            setuser(data.user);
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false);
        }
    }


    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try {
            const data = await register({ username, email, password });
            setuser(data.user);
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false);
        }

    }

    const handleLogout = async () => {
        setLoading(true)
        const data = await logout();
        setuser(null);
        setLoading(false);
    }

    useEffect(() => {

const getAndSetUser = async () => {
        try {
            const data = await getMe();
            if (data && data.user) {
                setuser(data.user);
            }
        } catch (err) {
            // 401 is normal if not logged in; just keep user as null
            console.warn("User not authenticated");
            setuser(null); 
        } finally {
            setLoading(false); // Stop the spinner regardless
        }
    };

    getAndSetUser();
    }, [])

    return { user, loading, handleLogin, handleRegister, handleLogout }
}