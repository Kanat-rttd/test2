import axios from 'axios'

const $host = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000,
})

$host.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
        config.headers['authorization'] = `Bearer ${token}`
    }
    return config
})

export default $host
