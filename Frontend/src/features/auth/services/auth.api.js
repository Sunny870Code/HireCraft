import axios from "axios";


const api = axios.create({
    baseURL: "https://hirecraft-1.onrender.com",
    withCredentials: true
})

// manually writing the api and credential 
export async function register({ username, email, password }) {
    try {
        const response = await api.post('api/auth/register', {
            username, email, password
        }, {
            withCredentials: true
        })
        return response.data;

    } catch (err) {
         console.error("Register API error:", err.response?.data || err.message);
        throw err;
    }

}

//using the api const , declared above to improve code reusablity
export const login = async ({ email, password }) => {
    try {
        const response = await api.post('/api/auth/login', {
            email, password
        })
        return response.data;
    } catch (err) {
         console.error("Login API error:", err.response?.data || err.message);
        throw err;
    }
}

export const logout = async () => {
    try {
        const response = await api.get('/api/auth/logout')
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const getMe = async () => {
    try {
        const response = await api.get('/api/auth/get-me')
        return response.data;
    } catch (err) {
        // console.log(err);
        throw err;
    }
} 