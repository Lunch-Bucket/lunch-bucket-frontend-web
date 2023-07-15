import axios from "axios";

export async function getFood() {
    try {
        const response = await axios.get('https://78skmyfnj5.execute-api.ap-south-1.amazonaws.com/dev/getFood');
        console.log('lunch menu',response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
