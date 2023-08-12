import axios from "axios";
import { baseUrl } from "./baseUrl";

export const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['token'] = token;
    } else {
      delete axios.defaults.headers.common['token'];
    }
  };

export async function getOrders(meal) {
    try {

        const token = localStorage.getItem('authToken');
        if (token) {
        // setAuthToken(token);
        const response = await axios.get(`${baseUrl}getOrderByMeal/${meal}`,{headers:{'token':`${token}`}});
        console.log('orders', response.data);
        return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}