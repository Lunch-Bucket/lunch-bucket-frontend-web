import axios from "axios";
import { baseUrl , expertUrl } from "./baseUrl";

export const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['token'] = token;
    } else {
      delete axios.defaults.headers.common['token'];
    }
  };

export async function getConfirmedOrders(meal) {
    try {

        const token = localStorage.getItem('lb_auth_token');
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

        const token = localStorage.getItem('lb_auth_token');
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
        const token = localStorage.getItem('lb_auth_token');
        const response = await axios.post(`${baseUrl}adminConfirm`,
        confirmOrderList,
        {headers: {'token': `${token}`}});
        console.log('confirm orders in controller', response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getReport(meal) {
    try {

        const token = localStorage.getItem('lb_auth_token');
        if (token) {
        // setAuthToken(token);
        const response = await axios.get(`${expertUrl}${meal}`,{headers:{'token':`${token}`}});
        console.log('orders', response.data);
        return response.data;
        }
    } catch (error) {
        console.log(error);
    }

}

export async function getOrdersReport(meal,place,time) {
    try {

        const token = localStorage.getItem('lb_auth_token');
        if (token) {
        const response = await axios.get(`${expertUrl}${meal}/${place}/${time}`,{headers:{'token':`${token}`}});
        console.log('generate orders report', response.data);
        return response.data;
        }
    } catch (error) {
        console.log(error);
    }

}

export async function informArrivalController(meal,place) {
    try {

        const token = localStorage.getItem('lb_auth_token');
        if (token) {
        const response = await axios.get(`https://1p8cy9d7v2.execute-api.ap-south-1.amazonaws.com/dev/informArrival/${meal}/${place}`,{headers:{'token':`${token}`}});
        console.log('arrival message-controller', response.data);
        return response.data;
        }
    } catch (error) {
        console.log(error);
    }

}