import axios from "axios";
import { baseUrl } from "./baseUrl";


// get food
export async function getFood() {
    try {
        const token = localStorage.getItem('lb_auth_token');
        if (token) {
            const response = await axios.get(`${baseUrl}getFood`,{headers:{'token':`${token}`}});
            console.log('menu list',response.data);
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getSpecialFood() {
    try {
        const token = localStorage.getItem('lb_auth_token');
        if (token) {
            const response = await axios.get(`${baseUrl}getSpecialMeal`,{headers:{'token':`${token}`}});
            console.log('special menu',response.data);
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}


// add food
export async function addFood(formData) {
    try {
        const token = localStorage.getItem('lb_auth_token');
        const response = await axios.post('https://1p8cy9d7v2.execute-api.ap-south-1.amazonaws.com/dev/addFood',formData,{headers: {'token': `${token}`}});
        console.log('lunch menu', response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function addSpecialFood(formData) {
    try {
        const token = localStorage.getItem('lb_auth_token');
        const response = await axios.post('https://1p8cy9d7v2.execute-api.ap-south-1.amazonaws.com/dev/addSpecialMeal',formData,{headers: {'token': `${token}`}});
        console.log('lunch menu', response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

// set meal
export async function setMealLunch(food_ids) {
    try {
        const token = localStorage.getItem('lb_auth_token');
        const response = await axios.post('https://1p8cy9d7v2.execute-api.ap-south-1.amazonaws.com/dev/lunch/setMenu',food_ids,{headers: {'token': `${token}`}});
        console.log('lunch menu', response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function setMealDinner(food_ids) {
    try {
        const token = localStorage.getItem('lb_auth_token');
        const response = await axios.post('https://1p8cy9d7v2.execute-api.ap-south-1.amazonaws.com/dev/dinner/setMenu',food_ids,{headers: {'token': `${token}`}});
        console.log('dinner menu', response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}



// set special meal
export async function setSpecialMealLunch(food_ids) {
    try {
        const token = localStorage.getItem('lb_auth_token');
        const response = await axios.post('https://1p8cy9d7v2.execute-api.ap-south-1.amazonaws.com/dev/lunch/setSpecialMenu',food_ids,{headers: {'token': `${token}`}});
        console.log('lunch special menu', response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function setSpecialMealDinner(food_ids) {
    try {
        const token = localStorage.getItem('lb_auth_token');
        const response = await axios.post('https://1p8cy9d7v2.execute-api.ap-south-1.amazonaws.com/dev/dinner/setSpecialMenu',food_ids,{headers: {'token': `${token}`}});
        console.log('dinner special menu', response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

// get food by customer
export async function getLunchMenu() {
    try {
        const token = localStorage.getItem('lb_auth_token');
        if (token) {
            const response = await axios.get('https://1p8cy9d7v2.execute-api.ap-south-1.amazonaws.com/dev/lunch/getMenus',{headers:{'token':`${token}`}});
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getDinnerMenu() {
    try {
        const token = localStorage.getItem('lb_auth_token');
        if (token) {
            const response = await axios.get('https://1p8cy9d7v2.execute-api.ap-south-1.amazonaws.com/dev/dinner/getMenus',{headers:{'token':`${token}`}});
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}
