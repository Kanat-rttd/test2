import $host from './axios'

export const getAllIndividualPrices = async () => {
    const { data } = await $host.get('inPrice')
    return data
}

export const createIndividualPrice = async (data: {
    clientId: string
    detail: { id: string; name: string; price: string }[]
}) => {
    const response = await $host.post('inPrice', data)
    return response
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
