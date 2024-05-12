import { controllerSetMealCount, controllerGetMealCount} from "../controllers/settingController";


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
  