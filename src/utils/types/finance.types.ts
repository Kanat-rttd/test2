export type ArrivalInputs = {
    amount: string
    date: Date
    account: string
    category: string
    clientId: number
    comment: string
}

export type TransferInputs = {
    fromAccount: string
    amount: string
    toAccount: string
    date: Date
    comment: string
}
