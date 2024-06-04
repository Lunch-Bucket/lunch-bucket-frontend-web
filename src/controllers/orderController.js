import axios from "axios";
import { expertUrl } from "./baseUrl";
import axiosInstance from "../apis/axiosInstance";


export const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['token'] = token;
    } else {
      delete axios.defaults.headers.common['token'];
    }
  };

export async function getConfirmedOrders(meal) {
    try {
        const response = await axiosInstance.get(`getOrderByMeal/${meal}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }

}

export async function getPendingOrders(meal) {
    try {
        const response = await axiosInstance.get(`getPendingOrderByMeal/${meal}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
  }



  export async function confirmOrders(confirmOrderList) {
    try {
        const response = await axiosInstance.post('adminConfirm',
        confirmOrderList);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getReport(meal) {
    try {
        const token = localStorage.getItem('lb_auth_token');
        const response = await axios.get(`${expertUrl}getReport/${meal}`,{headers:{'token':`${token}`}});
        return response.data;
    } catch (error) {
        console.log(error);
    }

}

export async function getOrdersReport(meal,place,time) {
    try {
        const response = await axiosInstance.get(`manufactureOrders/${meal}/${place}/${time}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }

}

export async function informArrivalController(meal,place) {
    try {
        const response = await axiosInstance.get(`informArrival/${meal}/${place}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }

}