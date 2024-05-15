import { Box, Button, Select } from '@chakra-ui/react'
import { useState, useEffect, ChangeEvent } from 'react'
import { REQUEST_PROCESSING_ROUTE } from '@/utils/constants/routes.consts'

import TableData from '@/components/TableData'
import { getByFacilityUnit } from '@/utils/services/sales.service'
import { useNavigate } from 'react-router-dom'
import UniversalComponent from '@/components/ui/UniversalComponent'
import DateRange from '@/components/DateRange'
import Header from '@/components/Header'
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
    const { getURLs } = useURLParameters()

    const navigate = useNavigate()
    const [getSalesData, setSalesData] = useState<OrderArray[]>([])

    const { data: salesData } = useApi<OrderArray[]>(`sales?${getURLs().toString()}`)
    const { data: facilityUnits } = useApi<FacilityUnit[] | undefined>(
        `mixers?${getURLs().toString()}`,
    )

    useEffect(() => {
        if (salesData) {
            setSalesData(salesData)
            console.log(salesData);
        }
    }, [])

    console.log(getSalesData);

    const handleChange = ({ target }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        console.log(target.value)
        const data = { facilityUnitId: target.value }

        getByFacilityUnit(data)
            .then((res) => {
                console.log(res.data.data)
                setSalesData(res.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <UniversalComponent>
            <Header>
                <Button
                    height={'100%'}
                    width={'20%'}
                    onClick={() => navigate(REQUEST_PROCESSING_ROUTE)}
                >
                    Обработка
                </Button>
                <Button height={'100%'} width={'20%'} bg={'rgba(217, 217, 217, 1)'}>
                    Обработанные
                </Button>
            </Header>

            <Box width={'100%'} p={5}>
                <Box
                    marginBottom={10}
                    height={'5%'}
                    display={'flex'}
                    justifyContent={'space-between'}
                >
                    <Box display={'flex'} gap={'15px'} width={'fit-content'}>
                        <DateRange />
                        <Select
                            variant="filled"
                            placeholder="Тип цеха"
                            name="bakingFacilityUnitId"
                            onChange={handleChange}
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
                    <TableData data={getSalesData.filter((sale) => sale.done === 1)} />
                </Box>
            </Box>
        </UniversalComponent>
    )
}

export default ProcessedPage
