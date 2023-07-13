import { getUsers } from "../controllers/userController";

export async function getUserData() {
    try {
        const result = await getUsers();
        return await result.data.data;
    } catch (error) {
        console.log("error:", error.message);
    }
}