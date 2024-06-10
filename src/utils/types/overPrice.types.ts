export type OverPriceType = {
    id: number
    price: string
    contragentId: number
    month: string
    year: string
    isDeleted: number
    client: {
        id: number
        name: string
    }
}

export type OverPriceInputs = {
    contragentId: number
    month: string
    year: string
    price: string
}