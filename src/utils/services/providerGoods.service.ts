import $host from './axios'

export const createProviderGoods = async (data: {
    goods: string
    unitOfMeasure: string
    providerId: number
    bakery: {
        value: number
        label: string
    }[]
    status: string
}) => {
    const response = await $host.post('providerGoods', data)
    return response
}

export const updateProviderGoods = async (
    id: number,
    data: {
        goods: string
        unitOfMeasure: string
        providerId: number
        bakery: {
            value: number
            label: string
        }[]
        status: string
    },
) => {
    const response = await $host.put(`providerGoods/${id}`, data)
    return response
}

export const deleteProviderGoods = async (id: number) => {
    const response = await $host.delete(`providerGoods/${id}`)
    return response
}
