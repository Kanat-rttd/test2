import $host from './axios'

export const getAllSales = async () => {
    const { data } = await $host.get('sales')
    return data
}

export const createSale = async (data: {
    date: string
    products: { productId: number; orderedQuantity: number; price: number }[]
    comment: string
    clientId: string
}) => {
    const response = await $host.post('sales', data)
    return response
}

export const getSaleById = async (id: number) => {
    const { data } = await $host.get(`sales/${id}`)
    return data
}

export const setDoneStatus = async (id: number) => {
    const response = await $host.put(`sales/status/${id}`)
    return response
}
