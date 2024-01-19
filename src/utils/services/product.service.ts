import $host from './axios'

export const getAll = async () => {
    const { data } = await $host.get('product')
    return data
}

export const createProduct = async (data: { name: string; bakeryType: string }) => {
    const response = await $host.post('product', data)
    return response
}

export const updateProduct = async (id: number, data: { name: string; bakeryType: string }) => {
    const response = await $host.put(`product/${id}`, data)
    return response
}

export const deleteProduct = async (id: number) => {
    const response = await $host.delete(`product/${id}`)
    return response
}
