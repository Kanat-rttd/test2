export type DispatchType = {
    id: number
    clientId: number
    createdAt: Date
    dispatch: number
    goodsDispatchDetails: {
        id: number
        productId: number
        quantity: number
        price: number
        product: {
            name: string
            price: number
            bakingFacilityUnit: {
                id: number
                facilityUnit: string
            }
        }
    }[]
    client: {
        id: number
        name: string
    }
}

// interface DispatchData {
//     goodsDispatchDetails: [
//         {
//             id: number
//             price: number
//             productId: number
//             quantity: number
//             product: {
//                 name: string
//                 price: number
//                 bakingFacilityUnit: {
//                     id: number
//                     facilityUnit: string
//                 }
//             }
//         },
//     ]
//     client: {
//         id: number
//         name: string
//     }
// }