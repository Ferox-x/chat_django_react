import axios from 'axios'

const baseAxios = {
    baseURL: 'http://localhost:8000/api/',
    timeout: 5000,
}

const axiosInstance = axios.create({
    ...{},
    ...baseAxios,
})

export { axiosInstance }
