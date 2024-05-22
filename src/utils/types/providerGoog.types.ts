export type ProviderGoodsType = {
    id: number
    providerId: number
    goods: string
    unitOfMeasure: string
    place: { label: string }[]
    status: string
    provider: {
        id: number
        name: string
    }
}

export type ProviderInputs = {
    id: number
    providerId: number
    goods: string
    unitOfMeasure: string
    bakery: { label: string }[]
    status: string
}