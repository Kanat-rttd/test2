import { Box, Button, Avatar, Input, Select } from '@chakra-ui/react'
import { useState, useEffect, ChangeEvent } from 'react'
import Drawler from '@/components/Drawler'
import { useNavigate } from 'react-router-dom'
import { MIXERS_BAKINGPRODUCTS_ROUTE } from '@/utils/constants/routes.consts'
import { getAllBakingFacilityUnits } from '@/utils/services/bakingFacilityUnits.service'
import { getAllSales, getByFacilityUnit } from '@/utils/services/sales.service'
import TableData from '@/components/TableData'

interface FacilityUnit {
    id: number
    facilityUnit: string
}

interface OrderArray {
    id: number
    userId: string
    totalPrice: string
    createdAt: Date
    done: string
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

const MixersPage = () => {
    const [facilityUnits, setFacilityUnits] = useState<FacilityUnit[] | undefined>()
    const [getSalesData, setSalesData] = useState<OrderArray[]>([])

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

    const navigate = useNavigate()
    return (
        <>
            <Box>
                <Box
                    display="flex"
                    justifyContent={'space-between'}
                    flexDirection={'row'}
                    backgroundColor={'rgba(128, 128, 128, 0.1)'}
                    px={5}
                    py={2}
                >
                    <Box width={'100%'}>
                        <Drawler></Drawler>
                        <Button bg={'rgba(217, 217, 217, 1)'} height={'100%'} width={'20%'}>
                            Заявки
                        </Button>
                        <Button
                            height={'100%'}
                            width={'20%'}
                            onClick={() => navigate(MIXERS_BAKINGPRODUCTS_ROUTE)}
                        >
                            Выпечка
                        </Button>
                    </Box>
                    <Avatar size={'md'} bg="teal.500" />
                </Box>
                <Box width={'100%'} height={'100%'} p={5}>
                    <Box marginBottom={10} display={'flex'} justifyContent={'space'}>
                        <Input
                            placeholder="Select Date and Time"
                            size="md"
                            type="datetime-local"
                            width={'20%'}
                            marginRight={30}
                        />
                        <Select
                            variant="filled"
                            placeholder="Тип цеха"
                            name="bakingFacilityUnitId"
                            onChange={handleChange}
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

export default MixersPage
