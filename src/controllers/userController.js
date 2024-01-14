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


export async function addToThreat(user_id) {
    try {
        const token = localStorage.getItem('lb_auth_token');
        const response = await axios.get(`https://1p8cy9d7v2.execute-api.ap-south-1.amazonaws.com/dev/addToThread/${user_id}`,{headers: {'token': `${token}`}});
        console.log('users in threat - controller', response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function removeFromThreat(user_id) {
    try {
        const token = localStorage.getItem('lb_auth_token');
        const response = await axios.get(`https://1p8cy9d7v2.execute-api.ap-south-1.amazonaws.com/dev/removeFromThread/${user_id}`,{headers: {'token': `${token}`}});
        console.log('users in remove threat - controller', response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}