import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
    userId: string
    email: string
    phone: number
    class: string
    iat: number
    exp: number
}

export default function getUserInfo() {
    const token = localStorage.getItem('authToken')

    if (!token) {
        throw new Error('Authentication token not found.')
    }

    const decodedToken: DecodedToken = jwtDecode(token)

    return decodedToken
}
