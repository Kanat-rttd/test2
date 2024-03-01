import $host from './axios'

export const getAllFinances = async (sortOrder = '') => {
    const { data } = await $host.get('finance', { params: { sortOrder } })
    return data
}

export const createArrival = async (data: {
    account: string
    amount: string
    category: string
    clientId: number
    comment: string
    date: Date
}) => {
    const response = await $host.post('finance/arrival', data)
    return response
}

export const createConsumption = async (data: {
    account: string
    amount: string
    category: string
    clientId: number
    comment: string
    date: Date
}) => {
    const response = await $host.post('finance/consumption', data)
    return response
}

export const createTransfer = async (data: {
    fromAccount: string
    toAccount: string
    date: Date
    comment: string
    amount: string
}) => {
    const response = await $host.post('finance/transfer', data)
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
