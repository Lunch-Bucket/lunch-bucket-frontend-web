import { getChats } from "../controllers/chatController";

export async function getChatData() {
    try {
        const result = await getChats();
        console.log("chat data in services", result)
        return await result;
    } catch (error) {
        console.log("error:", error.message);
    }
}