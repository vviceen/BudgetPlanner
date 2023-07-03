import axios from 'axios'

const budgetApi = axios.create({
    baseURL: 'http://127.0.0.1:8080',
    headers: {
        'Content-Type': 'application/json',
      },
});

budgetApi.defaults.xsrfCookieName = 'csrftoken';
budgetApi.defaults.xsrfHeaderName = 'X-CSRFToken';

export default budgetApi;

export const getUser = () => budgetApi.get("/")
    .then((response) => {
        return response.data; // Devuelve los datos de respuesta
    })
    .catch((error) => {
        console.log(error.response);
        throw error; // Vuelve a lanzar el error para manejarlo en otro lugar si es necesario
    });
export const createUser = (data) => budgetApi.post("/", data)
    // .then((result) => {
    //     console.log(result.data);
    // })
    // .catch((error) => {
    //     console.log(error.response);
    // })
export const updateUser = (id, data) => budgetApi.put(`/${id}`, data)
    // .then((result) => {
    //     console.log(result.data);
    // })
    // .catch((error) => {
    //     console.log(error.response);
    // })
export const deleteUser = (id) => budgetApi.delete(`/${id}`)
    // .then((result) => {
    //     console.log(result.data);
    // })
    // .catch((error) => {
    //     console.log(error.response);
    // })
