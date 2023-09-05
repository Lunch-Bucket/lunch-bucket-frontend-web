import axios from "axios";
import { baseUrl } from "./baseUrl";

export async function getChats() {
    try {
        const token = localStorage.getItem('authToken');
        if (token) {
            const response = await axios.get(`${baseUrl}getAdminChat`,{headers:{'token':`${token}`}});
            console.log('chat data in Controller: ',response.data);
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}