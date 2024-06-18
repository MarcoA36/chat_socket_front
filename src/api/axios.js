import axios from 'axios'
axios.defaults.withCredentials = true;
const instance = axios.create({
    // baseURL:'http://localhost:3001',
    baseURL:'https://chat-socket-sql-back.onrender.com',
    withCredentials: true
})

export default instance
