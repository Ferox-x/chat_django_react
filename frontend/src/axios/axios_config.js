import axios from 'axios'

const baseAxios = {
    baseURL: 'http://127.0.0.1:8000/api/',
    timeout: 5000,
}

const axiosInstance = axios.create({
    ...{},
    ...baseAxios,
})

export { axiosInstance }
