import axios from "axios";

export async function getFeedbacks() {
    try {
        const response = await axios.get('https://jeyh1ybmc2.execute-api.ap-south-1.amazonaws.com/dev/lunch/getMenus');
        console.log('feedbacks',response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}