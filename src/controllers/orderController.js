import axios from "axios";
import { baseUrl } from "./baseUrl";

export const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['token'] = token;
    } else {
      delete axios.defaults.headers.common['token'];
    }
  };

export async function getConfirmedOrders(meal) {
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


export async function getPendingOrders(meal) {
    try {

        const token = localStorage.getItem('authToken');
        if (token) {
        // setAuthToken(token);
        const response = await axios.get(`${baseUrl}getPendingOrderByMeal/${meal}`,{headers:{'token':`${token}`}});
        console.log('orders', response.data);
        return response.data;
        }
    } catch (error) {
        console.log(error);
    }
  }



  export async function confirmOrders(confirmOrderList) {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.post('https://1p8cy9d7v2.execute-api.ap-south-1.amazonaws.com/dev/adminConfirm',
        confirmOrderList,
        {headers: {'token': `${token}`}});
        console.log('confirm orders in controller', response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
