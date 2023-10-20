import axios from 'axios'

const tasksApi = axios.create({
    baseURL: 'http://localhost:8000/api/users/'
})

export const registerUser = (userData) => tasksApi.post('register/', userData)

export const getCurrentUser  = () => tasksApi.get('me')
