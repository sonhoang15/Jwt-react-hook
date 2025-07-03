import axios from "../setup/axios"

const createRoles = (roles) => {
    return axios.post('/api/v1/role/create', [...roles])
}
const fetchAllRole = () => {
    return axios.get(`/api/v1/role/read`)
}
const deleteRole = (role) => {
    return axios.delete(`/api/v1/role/delete`, { data: { id: role.id } })
}
const updateUser = (roleData) => {
    return axios.put(`/api/v1/role/update`, { ...roleData })
}

const fetchRoleByGroup = (groupId) => {
    return axios.get(`/api/v1/role/by-group/${groupId}`)
}
const assignToGroup = (data) => {
    return axios.post('/api/v1/role/assign-to-group', { data })
}
export {
    createRoles, fetchAllRole, deleteRole, fetchRoleByGroup, assignToGroup, updateUser
}