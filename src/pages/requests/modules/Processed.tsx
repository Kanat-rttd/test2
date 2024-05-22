import { Box, Select } from '@chakra-ui/react'
// import { useState, useEffect, ChangeEvent } from 'react'

import TableData from '@/components/TableData'
// import { getByFacilityUnit } from '@/utils/services/sales.service'
import UniversalComponent from '@/components/ui/UniversalComponent'
import DateRange from '@/components/DateRange'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { useApi } from '@/utils/services/axios'

interface OrderArray {
    id: number
    userId: string
    totalPrice: string
    createdAt: Date
    done: number
    orderDetails: [
        {
            orderDetailsId: string
            productId: string
            orderedQuantity: string
            product: {
                bakingFacilityUnit: {
                    id: string
                    facilityUnit: string
                }
                name: string
                price: string
            }
        },
    ]
    user: {
        id: string
        name: string
    }
}

interface FacilityUnit {
    id: number
    facilityUnit: string
}

const ProcessedPage = () => {
    const { getURLs, setParam } = useURLParameters()

    const { data: salesData } = useApi<OrderArray[]>(`sales?${getURLs().toString()}`)
    const { data: facilityUnits } = useApi<FacilityUnit[] | undefined>(
        `mixers?${getURLs().toString()}`,
    )

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target
        setParam('facilityUnitId', value)
    }

    return (
        <Box overflowY={'hidden'}>
            <UniversalComponent>
                <Box width={'100%'} p={5} mt={1}>
                    <Box mb={8} height={'5%'} display={'flex'} justifyContent={'space-between'}>
                        <Box display={'flex'} gap={'15px'} width={'fit-content'}>
                            <DateRange />
                            <Select
                                placeholder="Тип цеха"
                                name="bakingFacilityUnitId"
                                size={'sm'}
                                borderRadius={5}
                                onChange={handleSelectChange}
                                width={'100%'}
                            >
                                {facilityUnits?.map((unit, index) => {
                                    return (
                                        <option key={index} value={unit.id}>
                                            {unit.facilityUnit}
                                        </option>
                                    )
                                })}
                            </Select>
                        </Box>
                    </Box>
                    <Box height={'calc(95% - 2.5rem)'}>
                        <TableData data={salesData?.filter((sale) => sale.done === 1)} />
                    </Box>
                </Box>
            </UniversalComponent>
        </Box>
    )
}

export default ProcessedPage
