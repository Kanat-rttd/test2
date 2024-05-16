import { Box, Button, Select } from '@chakra-ui/react'
import { useState, useEffect, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { MIXERS_BAKINGPRODUCTS_ROUTE } from '@/utils/constants/routes.consts'
import { getAllBakingFacilityUnits } from '@/utils/services/bakingFacilityUnits.service'
import { getByFacilityUnit } from '@/utils/services/sales.service'
import TableData from '@/components/TableData'
import UniversalComponent from '@/components/ui/UniversalComponent'
import DateRange from '@/components/DateRange'
import { useApi } from '@/utils/services/axios'
import Header from '@/components/layout/Header'
import { useURLParameters } from '@/utils/hooks/useURLParameters'

interface FacilityUnit {
    id: number
    facilityUnit: string
}

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

const MixersPage = () => {
    const { getURLs } = useURLParameters()
    const [facilityUnits, setFacilityUnits] = useState<FacilityUnit[] | undefined>()
    // const [getSalesData, setSalesData] = useState<OrderArray[]>([])

    const { data: salesData } = useApi<OrderArray[]>(`sales?${getURLs().toString()}`)

    useEffect(() => {
        getAllBakingFacilityUnits().then((responseData) => {
            setFacilityUnits(responseData)
            console.log(responseData)
        })
    }, [])

    // useEffect(() => {
    //     getAllSales().then((res) => {
    //         console.log(res)
    //         setSalesData(res)
    //     })
    // }, [])

    const handleChange = ({ target }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        console.log(target.value)
        const data = { facilityUnitId: target.value }

        getByFacilityUnit(data)
            .then((res) => {
                console.log(res.data.data)
                // setSalesData(res.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const navigate = useNavigate()
    return (
        <UniversalComponent>
            <Header>
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
            </Header>

            <Box width={'100%'} height={'94%'} p={5}>
                <Box
                    marginBottom={5}
                    height={'5%'}
                    display={'flex'}
                    justifyContent={'space-between'}
                >
                    <Box display={'flex'} gap={'15px'} width={'100%'}>
                        <DateRange />

                        <Select
                            width={'20%'}
                            size={'sm'}
                            borderRadius={5}
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
                </Box>
                <Box height={'calc(95% - 2.5rem)'}>
                    {salesData && <TableData data={salesData?.filter((sale) => sale.done === 1)} />}
                </Box>
            </Box>
        </UniversalComponent>
    )
}

export default MixersPage
