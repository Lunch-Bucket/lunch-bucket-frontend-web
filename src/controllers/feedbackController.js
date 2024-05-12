import axios from "axios";
import baseUrl from "./baseUrl";


export async function getFeedbacks() {
    try {
        const response = await axios.get(`${baseUrl}lunch/getMenus`);
        console.log('feedbacks',response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}