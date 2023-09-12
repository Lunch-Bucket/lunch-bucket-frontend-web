import { getConfirmedOrders, getPendingOrders, confirmOrders } from "../controllers/orderController";

export async function getConfirmedOrderData(meal) {
    try {
        const result = await getConfirmedOrders(meal);
        return await result.data.data.map((item) => ({
            ...item,
           orderStatus: 'pending'
        }));

    } catch (error) {
        console.log("error:", error.message);
    }
}

export async function getPendingOrderData(meal) {
    try {
        const result = await getPendingOrders(meal);
        // return result.data.data;

        return await result.data.data.map((item) => ({
            ...item,
           orderStatus: 'pending'
        }));

    } catch (error) {
        console.log("error:", error.message);
    }
}

export async function confirmOrderData(confirmOrderList) {
    try {
        const response = await confirmOrders(confirmOrderList);
        console.log('confirmed orders in service', confirmOrderList)
        return response;
    } catch (error) {
        throw error;
    }
}