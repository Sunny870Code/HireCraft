import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";



const Protected = ({ children }) => {
    
    const { loading, user } = useAuth();

    if (loading) {
        return <main><h1>Loading...</h1></main>
    }
    console.log("USER:", user, "LOADING:", loading);

    if (!user) {
        return <Navigate to="/login" replace/>;
    }
    
    return children;
}

export default Protected;