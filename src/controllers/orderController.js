import axios from "axios";
import { expertUrl } from "./baseUrl";
import baseUrl from "./baseUrl";


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
        const response = await axios.get(`${baseUrl}getOrderByMeal/${meal}`,{headers:{'token':`${token}`}});
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
        const response = await axios.get(`${baseUrl}getPendingOrderByMeal/${meal}`,{headers:{'token':`${token}`}});
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
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getReport(meal) {
    try {

        const token = localStorage.getItem('lb_auth_token');
        if (token) {
        const response = await axios.get(`${expertUrl}${meal}`,{headers:{'token':`${token}`}});
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
        const response = await axios.get(`${baseUrl}${meal}/${place}`,{headers:{'token':`${token}`}});
        return response.data;
        }
    } catch (error) {
        console.log(error);
    }

}