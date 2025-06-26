import axios from "axios";

const RegisterService = (email, username, phone, password) => {
    return axios.post("http://localhost:8080/api/v1/register", {
        email, username, phone, password,
    })
}
const LoginService = (valueLogin, password) => {
    return axios.post("http://localhost:8080/api/v1/login", {
        valueLogin, password,
    })
}
const fetchAllUsers = (page, limit) => {
    return axios.get(`http://localhost:8080/api/v1/user/read?page=${page}&limit=${limit}`)
}

const deleteUser = (user) => {
    return axios.delete(`http://localhost:8080/api/v1/user/delete`, { data: { id: user.id } })
}
export {
    RegisterService, LoginService, fetchAllUsers, deleteUser
}