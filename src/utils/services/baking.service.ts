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
    time: string
    output: string
}) => {
    const response = await $host.post('baking', data)
    return response
}



export const deleteBaking = async (id: number) => {
    const response = await $host.delete(`baking/${id}`)
    return response
}
