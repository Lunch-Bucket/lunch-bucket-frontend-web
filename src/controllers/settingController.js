import axiosInstance from "../apis/axiosInstance";


export async function controllerSetMealCount(type, limit_type, limit) {
    try {
      const response = await axiosInstance.put('updatePacketLimit', { type, limit_type, limit });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  

  export async function controllerGetMealCount(meal_type, order_type, id) {
    try {
      const response = await axiosInstance.post('checkpacketlimit',{ meal_type, order_type, id });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  

    //Update Limits
    export async function controllerUpdateLimits({meal_type, limits}) {
      try {
        const response = await axiosInstance.put('freeorder_updatelimit', {meal_type,limits});
        return response.data;
      } catch (error) {
        console.error(error);
      }
    }

    export async function controllerUpdateLimitsSpecial({meal_type, limits}) {
      try {
        const response = await axiosInstance.put('freeorder_updatelimit_special', {meal_type,limits});
        return response.data;
      } catch (error) {
        console.error(error);
      }
    }
      
  
  