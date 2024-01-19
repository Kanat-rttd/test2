import $host from './axios'

export const createRequest = async () => {
    const response = await $host.post('requests')
    return response
}

export const getAll = async () => {
    const { data } = await $host.get('requests')
    return data
}
