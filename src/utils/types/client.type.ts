export type ClientType = {
    id: string
    name: string
    surname: string
    contact: string
    telegrammId: string
    status: string
}

export type ClientsFilter = {
    clientId: number
    client: {
        id: number
        name: string
    }
}