import $host from './axios'

export const createProviderGoods = async (data: {
    goods: string
    unitOfMeasure: string
    provider: number
    bakery: {
        value: number
        label: string
    }[]
    status: string
}) => {
    const response = await $host.post('providerGoods', data)
    return response
}
