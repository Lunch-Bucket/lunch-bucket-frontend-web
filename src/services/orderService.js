import { getOrders } from "../controllers/orderController";

export async function getOrderData() {
    try {
        const result = await getOrders();
        return await result.data.data;
    } catch (error) {
        console.log("error:", error.message);
    }
}