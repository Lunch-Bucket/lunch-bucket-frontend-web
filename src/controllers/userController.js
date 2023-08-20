import axios from "axios";
import { baseUrl } from "./baseUrl";

export async function getUsers() {
    try {
        const token = localStorage.getItem('authToken');
        if (token) {
            const response = await axios.get(`${baseUrl}getCustomers`,{headers:{'token':`${token}`}});
            console.log('users data: ',response.data);
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}