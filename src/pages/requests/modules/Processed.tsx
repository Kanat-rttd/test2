import { Box, Button, Avatar, Input, Select } from '@chakra-ui/react'
import Drawler from '@/components/Drawler'
import { useState, useEffect, ChangeEvent } from 'react'
import { REQUEST_PROCESSING_ROUTE } from '@/utils/constants/routes.consts'

import TableData from '@/components/TableData'
import { getAllSales, getByFacilityUnit } from '@/utils/services/sales.service'
import { getAllBakingFacilityUnits } from '@/utils/services/bakingFacilityUnits.service'
import { useNavigate } from 'react-router-dom'

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
    const navigate = useNavigate()
    const [getSalesData, setSalesData] = useState<OrderArray[]>([])
    const [facilityUnits, setFacilityUnits] = useState<FacilityUnit[] | undefined>()

    useEffect(() => {
        getAllBakingFacilityUnits().then((responseData) => {
            setFacilityUnits(responseData)
            console.log(responseData)
        })
    }, [])

    useEffect(() => {
        getAllSales().then((res) => {
            console.log(res.data)
            setSalesData(res.data)
        })
    }, [])

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
        <>
            <Box>
                <Box
                    display="flex"
                    justifyContent={'space-between'}
                    flexDirection={'row'}
                    backgroundColor={'rgba(128, 128, 128, 0.1)'}
                >
                    <Box width={'100%'}>
                        <Drawler></Drawler>
                        <Button
                            height={'100%'}
                            width={'20%'}
                            onClick={() => navigate(REQUEST_PROCESSING_ROUTE)}
                        >
                            Обработка
                        </Button>
                        <Button bg={'rgba(217, 217, 217, 1)'} height={'100%'} width={'20%'}>
                            Обработанные
                        </Button>
                    </Box>
                    <Avatar size={'md'} bg="teal.500" />
                </Box>
                <Box width={'100%'} height={'100%'} p={5}>
                    <Box display={'flex'}>
                        <Input type="Date" width={'20%'} marginRight={10} />
                        <Select
                            variant="filled"
                            placeholder="Тип цеха"
                            name="bakingFacilityUnitId"
                            onChange={handleChange}
                            width={'20%'}
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
                    <TableData data={getSalesData.filter((sale) => sale.done === 1)} />
                </Box>
            </Box>
        </>
    )
}

export default ProcessedPage
