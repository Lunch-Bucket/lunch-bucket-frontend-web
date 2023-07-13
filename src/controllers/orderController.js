import axios from "axios";

export async function getOrders() {
    try {
        const response = await axios.get('https://78skmyfnj5.execute-api.ap-south-1.amazonaws.com/dev/getOrderByCustomer/6406be8578ab87227bd73ac5');
        console.log('orders',response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}