export type ContragentType = {
    id: number
    contragentName: string
    mainId: number
    contragentTypeId: number
    contragentType: ContragentCategoryType
    status: string
    isDeleted: boolean
}

export type ContragentCategoryType = {
    id: number
    type: string
}