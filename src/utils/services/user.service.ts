import $host from './axios'

export const getAllUsers = async () => {
    const { data } = await $host.get('user')
    return data
}

export const createUser = async (data: { name: string; userClass: string }) => {
    const response = await $host.post('user', data)
    return response
}

export const updateUser = async (
    id: number,
    data: { name: string; userClass: string; pass: string; phone: string },
) => {
    const response = await $host.put(`user/${id}`, data)
    return response
}

export const loginUser = async (data: { phone: string; pass: string }) => {
    const response = await $host.post('user/login', data)
    return response
}

export const auth = async () => {
    const { data } = await $host.get(`user/auth`)
    return data
}

// export const deleteClient = async (id: number) => {
//     const response = await $host.delete(`client/${id}`)
//     return response
// }
