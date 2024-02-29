import { Box, Button, Avatar, Input } from '@chakra-ui/react'
import Drawler from '@/components/Drawler'
import { useState, useEffect } from 'react'

import { REQUEST_PROCESSED_ROUTE } from '@/utils/constants/routes.consts'

import AccordionClients from '@/components/AccordionClients'
import { getAllSales } from '@/utils/services/sales.service'
import { setDoneStatus } from '@/utils/services/sales.service'
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

const ProcessingPage = () => {
    const navigate = useNavigate()
    const [getSalesData, setSalesData] = useState<OrderArray[]>([])

    useEffect(() => {
        getAllSales().then((res) => {
            console.log(res.data)
            setSalesData(res.data)
        })
    }, [])

    const handleChangeStatus = async (clientName: OrderArray) => {
        setDoneStatus(clientName.id)
            .then((res) => {
                console.log(res)
                const updatedSalesData = getSalesData.map((sale) =>
                    sale.id === clientName.id ? { ...sale, done: 1 } : sale,
                )
                setSalesData(updatedSalesData)
            })
            .catch((error) => {
                console.error('Error updating order status:', error)
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
                        <Button bg={'rgba(217, 217, 217, 1)'} height={'100%'} width={'20%'}>
                            Обработка
                        </Button>
                        <Button
                            height={'100%'}
                            width={'20%'}
                            onClick={() => navigate(REQUEST_PROCESSED_ROUTE)}
                        >
                            Обработанные
                        </Button>
                    </Box>
                    <Avatar size={'md'} bg="teal.500" />
                </Box>
                <Box width={'100%'} height={'100%'} p={5}>
                    <Box>
                        <Input type="Date" width={'20%'} />
                    </Box>
                    <AccordionClients
                        data={getSalesData.filter((sale) => sale.done === 0)}
                        handleChangeStatus={handleChangeStatus}
                    />
                </Box>
            </Box>
        </>
    )
}

export default ProcessingPage
