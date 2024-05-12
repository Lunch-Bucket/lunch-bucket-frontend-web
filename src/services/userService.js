import { getUsers, addToThreat, removeFromThreat } from "../controllers/userController";

export async function getUserData() {
    try {
        const result = await getUsers();
        return await result.data.data;
    } catch (error) {
        console.log("error:", error.message);
    }
}

export async function userAddToThreat(user_id) {
    try {
        const response = await addToThreat(user_id);
        return response;
    } catch (error) {
        throw error;
    }
}

export async function userRemoveFromThreat(user_id) {
    try {
        const response = await removeFromThreat(user_id);
        return response;
    } catch (error) {
        throw error;
    }
}