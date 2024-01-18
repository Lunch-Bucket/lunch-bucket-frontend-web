import { getConfirmedOrders, getPendingOrders, confirmOrders , getReport, getOrdersReport, informArrivalController} from "../controllers/orderController";

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
        return response;
    } catch (error) {
        throw error;
    }
}

export async function generateReport(meal) {
    try {
        const result = await getReport(meal);
        alert(result.message)
    } catch (error) {
        console.log("error:", error.message);
    }
}

export async function generateOrdersPDF(meal,place,time) {
    try {
        const result = await getOrdersReport(meal,place,time);
        return result.data.data;
    } catch (error) {
        console.log("error:", error.message);
    }
}

export async function informArrival(meal,place) {
    try {
        const result = await informArrivalController(meal,place);
        return result.data.data;
    } catch (error) {
        console.log("error:", error.message);
    }
}