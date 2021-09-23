import axios from 'axios';

// const handleLoginApi = (email, password) => {
//     return axios.post('http://localhost:8081/api/login', { email, password });
// }

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('http://localhost:8081/api/login', { email: userEmail, password: userPassword });
}

const getAllUsers = (inputId) => {
    return axios.get(`http://localhost:8082/api/get-all-users?id=${inputId}`)
}

const createNewUserService = (data) => {
    console.log('check data from service: ', data)
    return axios.post(`http://localhost:8083/api/create-new-user`, data)
}

export { handleLoginApi, getAllUsers, createNewUserService };