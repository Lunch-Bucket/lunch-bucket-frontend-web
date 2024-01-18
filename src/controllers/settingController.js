import axios from "axios";
import { baseUrl } from "./baseUrl";


export async function controllerSetMealCount(type, limit) {
    try {
      const token = localStorage.getItem('lb_auth_token');
      const response = await axios.put(`${baseUrl}updatePacketLimit`, { type, limit }, {
        headers: { 'token': `${token}` }
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  

  export async function controllerGetMealCount() {
    try {
      const token = localStorage.getItem('lb_auth_token');
      const response = await axios.get(`${baseUrl}getPacketLimit`, {
        headers: { 'token': `${token}` }
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  
  
  