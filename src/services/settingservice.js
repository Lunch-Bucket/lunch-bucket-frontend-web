import { controllerSetMealCount, controllerGetMealCount} from "../controllers/settingController";


export async function updateMealCount(mealType, count) {
    try {
      const response = await controllerSetMealCount(mealType, count);
      return response;
    } catch (error) {
      throw error;
    }
  }
  

  export async function getMealCount() {
    try {
      const response = await controllerGetMealCount({});
      return response;
    } catch (error) {
      throw error;
    }
  }
  