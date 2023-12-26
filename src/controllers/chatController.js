import axios from "axios";
import { baseUrl } from "./baseUrl";

export async function getChats() {
    try {
        const token = localStorage.getItem('lb_auth_token');
        if (token) {
            const response = await axios.get(`${baseUrl}getAdminChat`,{headers:{'token':`${token}`}});
            console.log('chat data in Controller: ',response.data);
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}

// Admin Message
export async function setAdminMsg(reply) {
    try {
        const token = localStorage.getItem('lb_auth_token');
        const response = await axios.post('https://1p8cy9d7v2.execute-api.ap-south-1.amazonaws.com/dev/addAdminReply',reply,{headers: {'token': `${token}`}});
        console.log('admin reply', response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

// Admin View Status Update
export async function setAdminViewState(chatID) {
    try {
        const token = localStorage.getItem('lb_auth_token');
        const response = await axios.get(`https://1p8cy9d7v2.execute-api.ap-south-1.amazonaws.com/dev/setAdminView/${chatID}`,
        {headers: {'token': `${token}`}});
        console.log('admin status', response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}