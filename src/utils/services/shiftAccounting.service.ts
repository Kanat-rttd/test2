import $host from './axios'

export const getAllShiftAccounting = async () => {
    const { data } = await $host.get('shiftAccounting')
    return data
}

export const createShiftAccounting = async (data: {
    facilityUnitsId: string
    date: string
    departPersonals: {
        name: string
        id: number
        hours: number
    }[]
}) => {
    const response = await $host.post('shiftAccounting', data)
    return response
}

export const updateShifAccounting = async (id: number, data: {}) => {
    const response = await $host.put(`shiftAccounting/${id}`, data)
    return response
}
