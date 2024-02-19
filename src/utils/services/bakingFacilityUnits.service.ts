import $host from './axios'

export const getAllBakingFacilityUnits = async () => {
    const { data } = await $host.get('mixers')
    return data
}
