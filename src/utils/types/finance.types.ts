export type ArrivalInputs = {
    clientId: number
    amount: number | undefined
    date: Date
    account: string
    financeCategoryId: string
    contragentId: number
    comment: string
    invoiceNumber: number
}

export type TransferInputs = {
    fromAccount: string
    amount: number
    toAccount: string
    date: Date
    comment: string
}
