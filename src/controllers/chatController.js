import axiosInstance from '../apis/axiosInstance';

export const getChats = async (startId) => {
  try {
    const response = await axiosInstance.get('getAdminChat', {
      params: { startCollectionId: startId }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching chat data:', error);
    throw error;
  }
};

// Admin Message
export async function setAdminMsg(reply) {
    try {
        const response = await axiosInstance.post('addAdminReply',reply);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

// Admin View Status Update
export async function setAdminViewState(chatID) {
    try {
        const response = await axiosInstance.get(`setAdminView/${chatID}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}