import { getUsers, setThreat } from "../controllers/userController";

export async function getUserData() {
    try {
        const result = await getUsers();
        // return await result.data.data;

        return await result.data.data.map((item) => ({
            ...item,
           level:'neutral'
        }));
        
    } catch (error) {
        console.log("error:", error.message);
    }
}

export async function userThreatHandle(user_ids) {
    try {
        const response = await setThreat(user_ids);
        return response;
    } catch (error) {
        throw error;
    }
}