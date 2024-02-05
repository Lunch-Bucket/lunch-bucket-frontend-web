import axios from "axios";
import { baseUrl } from "./baseUrl";


export async function controllerSetMealCount(type, limit_type, limit) {
    try {
      const token = localStorage.getItem('lb_auth_token');
      const response = await axios.put(`${baseUrl}updatePacketLimit`, { type, limit_type, limit }, {
        headers: { 'token': `${token}` }
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  

  export async function controllerGetMealCount(meal_type, order_type, id) {
    try {
      const token = localStorage.getItem('lb_auth_token');
      const response = await axios.post(`${baseUrl}checkpacketlimit`,{ meal_type, order_type, id }, {
        headers: { 'token': `${token}` }
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  
  
  