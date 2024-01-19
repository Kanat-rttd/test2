import $host from './axios'

// export const createRequest = async () => {
//     const response = await $host.post('baking')
//     return response
// }

export const getAll = async () => {
    const { data } = await $host.get('baking')
    return data
}
