import { getChats, setAdminMsg, setAdminViewState } from "../controllers/chatController";

export async function getChatData() {
    try {
        const result = await getChats();
        console.log("chat data in services", result)
        return await result;
    } catch (error) {
        console.log("error:", error.message);
    }
}


export async function addAdminReply(replyMsg) {
    try {
        const response = await setAdminMsg(replyMsg);
        return response;
    } catch (error) {
        throw error;
    }
}

export async function setAdminViewStatus(chatID) {
    try {
        const response = await setAdminViewState(chatID);
        return response;
    } catch (error) {
        throw error;
    }
}
