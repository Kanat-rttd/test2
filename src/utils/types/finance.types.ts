export type ArrivalInputs = {
    sum: string
    date: Date
    account: string
    category: string
    contragent: string
    comment: string
}

export type TransferInputs = {
    fromAccount: string
    sum: number
    toAccount: string
    date: Date
    comment: string
}
