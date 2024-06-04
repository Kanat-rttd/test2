import $host from './axios'

export const createAdjustment = async (data: {
    qty: string
    Comment: string
    item: {
        id: number
        providerId: number
        goods: string
        unitOfMeasure: string
        place: { label: string }[]
        status: string
        provider: {
            id: number
            name: string
        }
    }
}) => {
    const response = await $host.post('adjustment', data)
    return response
}
