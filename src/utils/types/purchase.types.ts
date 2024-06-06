import { ProviderType } from "./provider.types"

export type PurchaseType = {
    id: number
    date: string
    providerId: number
    providerGoodId: number
    quantity: number
    price: number
    deliverySum: number
    totalSum: number
    status: string
    provider: ProviderType
    providerGood: {
        id: number
        name: string
        unitOfMeasure: string
    }
}
