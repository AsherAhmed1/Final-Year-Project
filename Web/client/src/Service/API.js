import axios from 'axios';

const URL = 'http://localhost:3000';

export const authenticateSignup = async (data) =>{
    try {
        return await axios.post(`${URL}/signup`, data);
    } catch (error) {
        console.log("Error while calling signup API", error);
    }
}