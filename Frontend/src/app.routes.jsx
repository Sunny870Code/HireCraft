import { createBrowserRouter } from "react-router";
import Register from "./auth/pages/Registration";
import LogIn from "./auth/pages/LogIn";




export const router = createBrowserRouter([
    {
        path:"/login",
        element:<LogIn />
    },
        {
        path:"/register",
        element:<Register />
    }
])