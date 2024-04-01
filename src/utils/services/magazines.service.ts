import $host from './axios'

export const getAllMagazines = async () => {
    const { data } = await $host.get('magazines')
    return data
}

export const createMagazine = async (data: { name: string; clientId: number; status: string }) => {
    const requestData = {
        data: data,
    }
    const response = await $host.post('magazines', requestData)
    return response
}

export const updateMagazine = async (
    id: number,
    data: { name: string; clientId: number; status: string },
) => {
    const response = await $host.put(`magazines/${id}`, data)
    return response
}
