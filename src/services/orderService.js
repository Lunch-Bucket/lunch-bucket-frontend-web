import { getOrders } from "../controllers/orderController";

export async function getOrderData(keyword) {
    try {
        const result = await getOrders();
        const orderData = result.data.data;
    
    const filteredData = orderData.filter(order =>
      order.order_id.toLowerCase().includes(keyword.toLowerCase())
    );

    return filteredData;
    } catch (error) {
        console.log("error:", error.message);
    }
}