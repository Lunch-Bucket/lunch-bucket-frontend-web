import axios from "axios";
import { baseUrl } from "./baseUrl";

export async function getUsers() {
    try {
        const response = await axios.get(`${baseUrl}getCustomers`);
        console.log('users data: ',response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}