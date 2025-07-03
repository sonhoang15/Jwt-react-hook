// import axios from "axios";
import axios from "../setup/axios"

const RegisterService = (email, username, phone, address, sex, password) => {
    return axios.post("/api/v1/register", {
        email, username, phone, address, sex, password,
    })
}
const LoginService = (valueLogin, password) => {
    return axios.post("/api/v1/login", {
        valueLogin, password,
    })
}
const fetchAllUsers = (page, limit) => {
    return axios.get(`/api/v1/user/read?page=${page}&limit=${limit}`)
}

const deleteUser = (user) => {
    return axios.delete(`/api/v1/user/delete`, { data: { id: user.id } })
}
const fetchGroups = () => {
    return axios.get(`/api/v1/group/read`)
}
const createNewUser = (userData) => {
    return axios.post(`/api/v1/user/create`, { ...userData })
}
const updateUser = (userData) => {
    return axios.put(`/api/v1/user/update`, { ...userData })
}
const getUserAccount = () => {
    return axios.get(`/api/v1/account`)
}
const logOutUser = () => {
    return axios.post(`/api/v1/logout`)
}
export {
    RegisterService,
    LoginService,
    fetchAllUsers,
    deleteUser,
    fetchGroups,
    createNewUser,
    updateUser,
    getUserAccount,
    logOutUser
}