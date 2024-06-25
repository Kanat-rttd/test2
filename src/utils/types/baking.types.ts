export type BakingDataType = {
    id: number
    breadType: string
    temperature: string
    output: string
    defective: string
    dateTime: string
    bakingDetails: BakingDetailType[]
    product?: {
        name: string
        id: string
    }
}

export type BakingDetailType = {
    goodsCategoryId: number
    quantity: number | undefined
}

export type BakingType = {
    bakingData: BakingDataType[]
    totals: BakingTotalsType
}

export type BakingTotalsType = {
    totalButter: number
    totalFlour: number
    totalMalt: number
    totalOutput: number
    totalSalt: number
    totalYeast: number
    totalDefective: number
}

