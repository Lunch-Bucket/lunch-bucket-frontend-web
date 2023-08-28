import { getFood, getSpecialFood, setMenu, setSpecialMeal as controllerSetSpecialMeal } from "../controllers/menuController";
import axios from "axios";

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


export async function addFoodItem(formData) {
    try {
        const response = await setMenu(formData);
        return response;
    } catch (error) {
        throw error;
    }
}



export async function setSpecialMeal(food_ids) {
    try {
        const response = await controllerSetSpecialMeal(food_ids);
        return response;
    } catch (error) {
        throw error;
    }
}


export const deleteFoodItem = async (foodId) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.delete(
            `https://1p8cy9d7v2.execute-api.ap-south-1.amazonaws.com/dev/deleteFood/${foodId}`,
            { headers: { 'token': `${token}` } }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};



