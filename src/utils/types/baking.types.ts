export type BakingDataType = {
    id: number
    breadType: string
    flour: string
    salt: string
    yeast: string
    malt: string
    butter: string
    temperature: string
    time: string
    output: string
    defective: string
    date: Date
    product?: {
        name: string
        id: string
    }
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

