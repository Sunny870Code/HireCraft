import { createBrowserRouter } from "react-router-dom";
import Register from "./features/auth/pages/Registration";
import LogIn from "./features/auth/pages/LogIn";
import Protected from "./features/auth/component/Protected";




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
        path: "/",
        element: <Protected>
            <h1>home page</h1>
        </Protected>
    }
])