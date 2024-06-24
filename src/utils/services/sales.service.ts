import $host from './axios'

export const getAllSales = async () => {
    const { data } = await $host.get('sales')
    return data
}

export const createSale = async (data: {
    products: { productId: number | null; orderedQuantity: number | null }[]
    date: Date
    clientId: number
}) => {
    const response = await $host.post('sales', data)
    return response
}

export const updateSale = async (
    id: number,
    data: {
        products: { productId: number | null; orderedQuantity: number | null }[]
        date: Date
        clientId: number
    },
) => {
    const response = await $host.put(`sales/${id}`, data)
    return response
}

export const deleteSale = async (id: number) => {
    const response = await $host.delete(`sales/${id}`)
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

export const getByFacilityUnit = async (data: { facilityUnitId: string }) => {
    const response = await $host.post('sales/status/test', data)
    return response
}
