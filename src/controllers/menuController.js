import axiosInstance from '../apis/axiosInstance';


// get food
export async function getFood() {
    try {
        const response = await axiosInstance.get('getFood');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getSpecialFood() {
    try {
        const token = localStorage.getItem('lb_auth_token');
        if (token) {
            const response = await axiosInstance.get('getSpecialMeal');
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}


// add food
export async function addFood(formData) {
    try {
        const response = await axiosInstance.post('addFood',formData);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function addSpecialFood(formData) {
    try {
        const response = await axiosInstance.post('addSpecialMeal',formData);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

// set meal
export async function setMealLunch(food_ids) {
    try {
        const response = await axiosInstance.post( 'lunch/setMenu',food_ids);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function setMealDinner(food_ids) {
    try {
        const response = await axiosInstance.post('dinner/setMenu',food_ids);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}



// set special meal
export async function setSpecialMealLunch(food_ids) {
    try {
        const token = localStorage.getItem('lb_auth_token');
        const response = await axiosInstance.post('lunch/setSpecialMenu',food_ids);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function setSpecialMealDinner(food_ids) {
    try {
        const response = await axiosInstance.post('dinner/setSpecialMenu',food_ids);
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
            const response = await axiosInstance.get('lunch/getMenus');
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
            const response = await axiosInstance.get('dinner/getMenus');
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}


//Delete Food
export async function DeleteFood(foodId) {
    try {
        const response = await axiosInstance.delete(`deleteFood/${foodId}`);
        console.log('delete food', response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

