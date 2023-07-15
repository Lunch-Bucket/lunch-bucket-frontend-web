import { getFood} from "../controllers/menuController";

export async function getFoodItem() {
    try {
        const result = await getFood();
        return await result.data.data;
    } catch (error) {
        console.log("error:", error.message);
    }
}
