import axios from "./axios"

// import axios from 'axios'

// const API = 'http://localhost:3001'

export const registerRequest = user => axios.post(`/register`, user)

export const loginRequest = user => axios.post(`/login`, user)


export const verifyTokenRequest = () => axios.get('/verify')
