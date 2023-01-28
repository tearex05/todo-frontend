import axios from 'axios'

const url = 'https://todo-backend-odoa.onrender.com/todos'
const url2 = 'https://todo-backend-odoa.onrender.com/auth/'

export const getTodos = async () => await axios.get(url)
export const createTodo = async (data) => await axios.post(url, data)
export const updateTodo = async (id, data) => await axios.patch(`${url}/${id}`, data)
export const deleteTodo = async (id) => await axios.delete(`${url}/${id}`)
export const getTodo = async (id) => await axios.get(`${url}/${id}`)
export const signUp = async (data) => await axios.post(`${url2}signup`, data)
export const logIn = async (data) => await axios.post(`${url2}signin`, data)
