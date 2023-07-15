import axios from "axios";
import { baseUrl } from "./baseUrl";

export async function getOrders(meal) {
    try {
        const response = await axios.get(`${baseUrl}getOrderByMeal/${meal}`);
        console.log('orders',response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}