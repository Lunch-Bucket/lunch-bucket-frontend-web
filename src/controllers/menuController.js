import axios from "axios";
import baseUrl from "./baseUrl";


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
        const response = await axios.post(`${baseUrl}addFood`,formData,{headers: {'token': `${token}`}});
        console.log('lunch menu', response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function addSpecialFood(formData) {
    try {
        const token = localStorage.getItem('lb_auth_token');
        const response = await axios.post(`${baseUrl}addSpecialMeal`,formData,{headers: {'token': `${token}`}});
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
        const response = await axios.post( `${baseUrl}lunch/setMenu`,food_ids,{headers: {'token': `${token}`}});
        console.log('lunch menu', response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function setMealDinner(food_ids) {
    try {
        const token = localStorage.getItem('lb_auth_token');
        const response = await axios.post(`${baseUrl}dinner/setMenu`,food_ids,{headers: {'token': `${token}`}});
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
        const response = await axios.post(`${baseUrl}lunch/setSpecialMenu`,food_ids,{headers: {'token': `${token}`}});
        console.log('lunch special menu', response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function setSpecialMealDinner(food_ids) {
    try {
        const token = localStorage.getItem('lb_auth_token');
        const response = await axios.post(`${baseUrl}dinner/setSpecialMenu`,food_ids,{headers: {'token': `${token}`}});
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
            const response = await axios.get(`${baseUrl}lunch/getMenus`,{headers:{'token':`${token}`}});
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
            const response = await axios.get(`${baseUrl}dinner/getMenus`,{headers:{'token':`${token}`}});
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}
