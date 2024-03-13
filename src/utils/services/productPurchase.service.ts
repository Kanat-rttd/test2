import $host from './axios'

export const getAllPruchases = async () => {
    const { data } = await $host.get('productPurchase')
    return data
}

export const createPurchase = async (data: {
    quantity: number
    price: number
    deliverySum: number
    date: Date
    providerId: number
    rawMaterialId: number
    status?: { value: number; label: string } | string | undefined
}) => {
    const response = await $host.post('productPurchase', data)
    return response
}

export const updatePurchase = async (
    id: string,
    data: {
        quantity: number
        price: number
        deliverySum: number
        date: Date
        providerId: number
        rawMaterialId: number
        status?: { value: number; label: string } | string | undefined
    },
) => {
    const response = await $host.put(`productPurchase/${id}`, data)
    return response
}
