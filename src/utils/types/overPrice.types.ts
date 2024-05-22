export type OverPriceType = {
    id: number
    price: string
    clientId: number
    month: string
    year: string
    isDeleted: number
    client: {
        id: number
        name: string
    }
}

export type OverPriceInputs = {
    clientId: number
    month: string
    year: string
    price: string
}