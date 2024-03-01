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

// export const fetcher = async (url: string) => {
//     const response = await $host.get(url)
//     return response.data
// }

export const fetcher = async (url: string, params?: any) => {
    const response = await $host.get(url, { params })
    return response.data
}

export default $host
