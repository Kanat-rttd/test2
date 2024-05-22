export type MagazineType = {
    id: number
    name: string
    clientId: number
    status: string
    client: {
        id: number
        name: string
    }
}