import { createBrowserRouter } from "react-router-dom";
import Register from "./features/auth/pages/Registration";
import LogIn from "./features/auth/pages/LogIn";
import Protected from "./features/auth/component/Protected";
import Home from "./features/interview/pages/Home";




export const router = createBrowserRouter([
    {
        path: "/login",
        element: <LogIn />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/home",
        element:
            <Home />
       
    }
])