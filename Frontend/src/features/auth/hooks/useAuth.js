import { useContext } from "react";
import { AuthContext } from "../services/auth.context";
import { login, register, logout, getMe } from "../services/auth.api";




export function useAuth() {
    const context = useContext(AuthContext);
    const { user, setuser, loading, setLoading } = context;

    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        const data = await login({ email, password });
        setuser(data.user);
        setLoading(false);
    }


    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        const data = await register({username, email, password });
        setuser(data.user);
        setLoading(false);
    }

    const handleLogout = async () => {
        setLoading(true)
        const data = await logout();
        setuser(null);
        setLoading(false);
    }
    
    return {user,loading,handleLogin,handleRegister,handleLogout}
}