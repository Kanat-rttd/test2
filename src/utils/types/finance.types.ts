export type ArrivalInputs = {
    clientId: number
    amount: number | null
    date: Date
    account: string
    financeCategoryId: number | undefined
    contragentId: number | undefined
    comment: string
    invoiceNumber: number
}

export type TransferInputs = {
    fromAccount: string
    amount: number | null
    toAccount: string
    date: Date
    comment: string
}
