import { getOrders } from "../controllers/orderController";

export async function getOrderData(meal) {
    try {
        const result = await getOrders(meal);
        // return result.data.data;

        return await result.data.data.map((item) => ({
            ...item,
           orderStatus: 'pending'
        }));

    } catch (error) {
        console.log("error:", error.message);
    }
}