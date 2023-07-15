import { getFeedbacks } from "../controllers/feedbackController";

export async function getfeedbackData() {
    try {
        const result = await getFeedbacks();
        return await result.data.data;
    } catch (error) {
        console.log("error:", error.message);
    }
}