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

export {
    RegisterService, LoginService
}