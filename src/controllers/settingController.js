import axios from "axios";
export async function controllerSetMealCount(type, limit) {
    try {
      const token = localStorage.getItem('lb_auth_token');
      const response = await axios.put(`https://1p8cy9d7v2.execute-api.ap-south-1.amazonaws.com/dev/updatePacketLimit`, { type, limit }, {
        headers: { 'token': `${token}` }
      });
  
      console.log('Meal updated', response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  

  export async function controllerGetMealCount() {
    try {
      const token = localStorage.getItem('lb_auth_token');
      const response = await axios.get(`https://1p8cy9d7v2.execute-api.ap-south-1.amazonaws.com/dev/getPacketLimit`, {
        headers: { 'token': `${token}` }
      });
  
      console.log('get meal count - controller', response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  
  
  