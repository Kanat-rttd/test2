export type ArrivalInputs = {
    clientId: number
    amount: string
    date: Date
    account: string
    financeCategoryId: string
    contragentId: number
    comment: string
    invoiceNumber: number
}

export type TransferInputs = {
    fromAccount: string
    amount: string
    toAccount: string
    date: Date
    comment: string
}
