import $host from './axios'

export const getAllFactInputs = async () => {
    const { data } = await $host.get('factInput')
    return data
}

export const createFactInput = async (
    data: {
        name: string
        place: string
        unitOfMeasure: string
        quantity: number
    }[],
) => {
    const response = await $host.post('factInput', data)
    return response
}

export const updateFactInput = async (
    id: string,
    data: {
        name: string
        place: string
        quantity: number
    },
) => {
    const response = await $host.put(`factInput/${id}`, data)
    return response
}
