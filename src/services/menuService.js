import { getFood, getSpecialFood, addFood, addSpecialFood, setMealLunch as controllerSetMealLunch, setMealDinner as controllerSetMealDinner,setSpecialMealLunch as controllerSetSpecialMealLunch, setSpecialMealDinner as controllerSetSpecialMealDinner , getLunchMenu as controllerGetLunchMenu, getDinnerMenu as controllerGetDinnerMenu } from "../controllers/menuController";
import axios from "axios";


// get food
export async function getFoodItem() {
    try {
        const result = await getFood();
        return await result.data.data;
    } catch (error) {
        console.log("error:", error.message);
    }
}


export async function getSpecialMenu() {
    try {
        const result = await getSpecialFood();
        return await result.data.data;
    } catch (error) {
        console.log("error:", error.message);
    }
}



// add food
export async function addFoodItem(formData) {
    try {
        const response = await addFood(formData);
        return response;
    } catch (error) {
        throw error;
    }
}


export async function addSpecialFoodItem(formData) {
    try {
        const response = await addSpecialFood(formData);
        return response;
    } catch (error) {
        throw error;
    }
}

// set meal
export async function setMealLunch(food_ids) {
    try {
        const response = await controllerSetMealLunch(food_ids);
        return response;
    } catch (error) {
        throw error;
    }
}

export async function setMealDinner(food_ids) {
    try {
        const response = await controllerSetMealDinner(food_ids);
        return response;
    } catch (error) {
        throw error;
    }
}



// set special meal
export async function setSpecialMealLunch(food_ids) {
    try {
        const response = await controllerSetSpecialMealLunch(food_ids);
        return response;
    } catch (error) {
        throw error;
    }
}

export async function setSpecialMealDinner(food_ids) {
    try {
        const response = await controllerSetSpecialMealDinner(food_ids);
        return response;
    } catch (error) {
        throw error;
    }
}



// delete food
export const deleteFoodItem = async (foodId) => {
    try {
        const token = localStorage.getItem('lb_auth_token');
        const response = await axios.delete(`https://1p8cy9d7v2.execute-api.ap-south-1.amazonaws.com/dev/deleteFood/${foodId}`,
            { headers: { 'token': `${token}` } }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

// get food by customer
export async function getLunchMenu() {
    try {
        const result = await controllerGetLunchMenu();
        return await result.data;
    } catch (error) {
        console.log("error:", error.message);
    }
}

export async function getDinnerMenu() {
    try {
        const result = await controllerGetDinnerMenu();
        return await result.data;
    } catch (error) {
        console.log("error:", error.message);
    }
}


