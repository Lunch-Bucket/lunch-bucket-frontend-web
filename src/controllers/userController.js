import axios from "axios";
import { baseUrl } from "./baseUrl";

export async function getUsers() {
    try {
        const token = localStorage.getItem('lb_auth_token');
        if (token) {
            const response = await axios.get(`${baseUrl}getCustomers`,{headers:{'token':`${token}`}});
            console.log('users data: ',response.data);
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}


export async function setThreat(user_ids) {
    try {
        const token = localStorage.getItem('lb_auth_token');
        const response = await axios.post(`${baseUrl}addToThread/`,user_ids,{headers: {'token': `${token}`}});
        console.log('users in threat - controller', response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}