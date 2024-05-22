import $host from './axios'

export const getAllShiftAccounting = async () => {
    const { data } = await $host.get('shiftAccounting')
    return data
}

export const createShifAccounting = async (data: {}) => {
    const response = await $host.post('shiftAccounting', data)
    return response
}

export const updateShifAccounting = async (id: number, data: {}) => {
    const response = await $host.put(`shiftAccounting/${id}`, data)
    return response
}
