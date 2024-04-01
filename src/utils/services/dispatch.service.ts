import $host from './axios'

export const getAllDispatches = async () => {
    const { data } = await $host.get('release')
    return data
}

export const createDispatch = async (data: {
    userId: string
    products: { name: string; quantity: number; id: string }[]
    dispatch: string
}) => {
    const response = await $host.post('release', data)
    return response
}

export const getInvoiceData = async () => {
    const { data } = await $host.get('release/invoice')
    return data
}

// export const getSaleById = async (id: number) => {
//     const { data } = await $host.get(`sales/${id}`)
//     return data
// }

// export const setDoneStatus = async (id: number) => {
//     const response = await $host.put(`sales/status/${id}`)
//     return response
// }

// export const getByFacilityUnit = async (data: { facilityUnitId: string }) => {
//     const response = await $host.post('sales/status/test', data)
//     return response
// }
