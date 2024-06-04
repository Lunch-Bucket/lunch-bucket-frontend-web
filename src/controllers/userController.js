import axiosInstance from "../apis/axiosInstance";

export async function getUsers() {
    try {
        const response = await axiosInstance.get('getCustomers');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export async function addToThreat(user_id) {
    try {
        const response = await axiosInstance.get(`addToThread/${user_id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function removeFromThreat(user_id) {
    try {
        const response = await axiosInstance.get(`removeFromThread/${user_id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}