import $host from './axios'

export const getAllShiftAccounting = async () => {
    const { data } = await $host.get('shiftAccounting')
    return data
}

// export const createDispatch = async (data: {
//     userId: string
//     products: { name: string; quantity: number; id: string }[]
//     dispatch: string
// }) => {
//     const response = await $host.post('release', data)
//     return response
// }
