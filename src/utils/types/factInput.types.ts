export type FactInputType = {
    table: FactInputTableData[]
    totalFact: number
}

export type FactInputTableData = {
    id: number
    name: string
    place: string
    unitOfMeasure: string
    quantity: number
    updatedAt: string
}

export type AddFactModalInputs = {
    id: number
    name: string
    place: string
    unitOfMeasure: string
    quantity: string
    updatedAt: string
}
