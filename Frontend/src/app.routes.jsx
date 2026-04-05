import { createBrowserRouter } from "react-router";
import Register from "./features/auth/pages/Registration";
import LogIn from "./features/auth/pages/LogIn";




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