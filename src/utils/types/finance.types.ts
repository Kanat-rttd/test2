export type ArrivalInputs = {
    amount: string
    date: Date
    account: string
    financeCategoryId: string
    clientId: number
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
