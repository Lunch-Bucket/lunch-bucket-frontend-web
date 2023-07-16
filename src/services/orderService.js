import { getOrders } from "../controllers/orderController";

export async function getOrderData(meal) {
    try {
        const result = await getOrders(meal);
        return result.data.data;

    } catch (error) {
        console.log("error:", error.message);
    }
}