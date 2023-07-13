import axios from "axios";

export async function getUsers() {
    try {
        const response = await axios.get('https://78skmyfnj5.execute-api.ap-south-1.amazonaws.com/dev/getCustomers');
        console.log('users data: ',response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}