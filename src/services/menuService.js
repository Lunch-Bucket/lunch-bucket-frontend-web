import { getFood, getSpecialFood, setMenu} from "../controllers/menuController";

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
