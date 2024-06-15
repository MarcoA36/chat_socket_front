import axios from "./axios"

export const inboxRequest = async () => {
  return axios.get(`/buzon`);
};

export const messagesRequest = async (receiverId) => {
  return axios.get(`/messages/${receiverId}`);
};
