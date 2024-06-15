import axios from "./axios"

export const usersRequest = (userId) => axios.get(`/users`, {
    params: { userId }
  });

export const addContactRequest = user => axios.post(`/add-contact`, user)