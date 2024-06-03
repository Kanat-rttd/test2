import $host from './axios'

export const getAllBakings = async () => {
    const { data } = await $host.get('baking')
    return data
}

export const createBaking = async (data: {
    breadType: string
    flour: string
    salt: string
    yeast: string
    malt: string
    butter: string
    temperature: string
    dateTime: string
    // time: string
    output: string
    defective: string
    // date: Date
}) => {
    const response = await $host.post('baking', data)
    return response
}

export const updateBaking = async (
    id: number,
    data: {
        breadType: string
        flour: string
        salt: string
        yeast: string
        malt: string
        butter: string
        temperature: string
        // time: string
        dateTime: string
        output: string
        defective: string
        // date: Date
    },
) => {
    const response = await $host.put(`baking/${id}`, data)
    return response
}


export const deleteBaking = async (id: number) => {
    const response = await $host.delete(`baking/${id}`)
    return response
}
