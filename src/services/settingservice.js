import { controllerSetMealCount, controllerGetMealCount, controllerUpdateLimitsSpecial, controllerUpdateLimits} from "../controllers/settingController";


export async function updateMealCount(mealTime, mealType, count) {
    try {
      const response = await controllerSetMealCount(mealTime, mealType, count);
      return response;
    } catch (error) {
      throw error;
    }
  }
  

  export async function getMealCount({ meal_type, order_type, id },) {
    try {
      const response = await controllerGetMealCount({ meal_type, order_type, id },);
      return response;
    } catch (error) {
      throw error;
    }
  }
  


  //Update Limits
  export async function updateLimits({meal_type, limits}) {
    try {
      const response = await controllerUpdateLimits({meal_type, limits});
      return response;
    } catch (error) {
      throw error;
    }
  }
  

  export async function updateLimitsSpecial({meal_type, limits}) {
    try {
      const response = await controllerUpdateLimitsSpecial({meal_type, limits});
      return response;
    } catch (error) {
      throw error;
    }
  }
  
