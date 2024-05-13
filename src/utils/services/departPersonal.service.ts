import $host from './axios'

export const getAllDepartPersonal = async (selectedStatus: string | undefined) => {
    const { data } = await $host.get('departPersonal', {
        params: { status: selectedStatus },
    })
    return data
}

export const createDepartPersonal = async (data: {
    name: string
    surname: string
    status: string
    userClass: string
    fixSalary: string
}) => {
    const response = await $host.post('departPersonal', data)
    return response
}

export const updateDepartPersonal = async (
    id: number,
    data: {
        name: string
        surname: string
        status: string
        userClass: string
        fixSalary: string
    },
) => {
    const response = await $host.put(`departPersonal/${id}`, data)
    return response
}

export const deleteDepartClient = async (id: number) => {
    const response = await $host.delete(`departPersonal/${id}`)
    return response
}