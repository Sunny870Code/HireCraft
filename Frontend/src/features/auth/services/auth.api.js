import axios from "axios";


const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

// manually writing the api and credential 
export async function register({ username, email, password }) {
    try {
        const response = await axios.post('http://localhost:3000/api/auth/register', {
            username, email, password
        }, {
            withCredentials: true
        })
        return response.data;

    } catch (err) {
        console.log(err);
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
        console.log(err);
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
        console.log(err);
    }
} 