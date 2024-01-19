import $host from './axios'

export const getAll = async () => {
    const { data } = await $host.get('client')
    return data
}

export const createClient = async (data: { name: string; email: string }) => {
    const response = await $host.post('client', data)
    return response
}

export const updateClient = async (id: number, data: { name: string; email: string }) => {
    const response = await $host.put(`client/${id}`, data)
    return response
}

export const deleteClient = async (id: number) => {
    const response = await $host.delete(`client/${id}`)
    return response
}
