import { controllerSetMealCount, controllerGetMealCount, controllerUpdateLimitsSpecial, controllerUpdateLimits, controllerPredictLimits, controllerPredictMenu} from "../controllers/settingController";


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

  //Predict Limits
  export async function predictLimits(formData) {
    try {
      const response = await controllerPredictLimits(formData);
      return response;
    } catch (error) {
      throw error;
    }
  }
  

    //Predict Menu
    export async function predictMenu(formData) {
      try {
        const response = await controllerPredictMenu(formData);
        return response;
      } catch (error) {
        throw error;
      }
    }
    
