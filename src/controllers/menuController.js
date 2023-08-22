import axios from "axios";
import { baseUrl } from "./baseUrl";

export async function getFood() {
    try {
        const token = localStorage.getItem('authToken');
        if (token) {
            const response = await axios.get(`${baseUrl}getFood`,{headers:{'token':`${token}`}});
            console.log('lunch menu',response.data);
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getSpecialFood() {
    try {
        const token = localStorage.getItem('authToken');
        if (token) {
            const response = await axios.get(`${baseUrl}getSpecialMeal`,{headers:{'token':`${token}`}});
            console.log('special menu',response.data);
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}


export async function setMenu(formData) {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.post('https://1p8cy9d7v2.execute-api.ap-south-1.amazonaws.com/dev/addFood',formData,{headers: {'token': `${token}`}});
        console.log('lunch menu', response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

