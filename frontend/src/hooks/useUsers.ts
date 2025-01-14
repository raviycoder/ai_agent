import axios from "axios";

interface User {
    email: string;
    password: string;
}

const useUsers = () => {

    const startUrl = "http://localhost:5000/api/auth";
    const createUser = async (user: User) => {
        try {
            const response = await axios.post(`${startUrl}/register`, user);
            await localStorage.setItem("authToken", response.data.token);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    const loginUser = async (user: User) => {
        try {
            const response = await axios.post(`${startUrl}/login`, user);
            await localStorage.setItem("authToken", response.data.token);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    return {
        createUser,
        loginUser
    }
};

export default useUsers;