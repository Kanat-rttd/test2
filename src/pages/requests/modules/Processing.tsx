import { Box, Button } from '@chakra-ui/react'
import { REQUEST_PROCESSED_ROUTE } from '@/utils/constants/routes.consts'
import AccordionClients from '@/components/AccordionClients'
// import { getAllSales } from '@/utils/services/sales.service'
import { setDoneStatus } from '@/utils/services/sales.service'
import { useNavigate } from 'react-router-dom'
import DateRange from '@/components/DateRange'

import { useApi } from '@/utils/services/axios'
import UniversalComponent from '@/components/ui/UniversalComponent'
import Header from '@/components/Header'
import { useURLParameters } from '@/utils/hooks/useURLParameters'

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
    const { getURLs } = useURLParameters()
    const navigate = useNavigate()
    // const [getSalesData, setSalesData] = useState<OrderArray[]>([])

    // const { data: salesData } = useApi<OrderArray[]>('sales')

    const { data: salesData } = useApi<OrderArray[]>(`sales?${getURLs().toString()}`)

    console.log(salesData)

    // useEffect(() => {
    //     getAllSales().then((res) => {
    //         console.log(res.data)
    //         setSalesData(res.data)
    //     })
    // }, [])

    const handleChangeStatus = async (clientName: OrderArray) => {
        setDoneStatus(clientName.id)
            .then((res) => {
                console.log(res)
                // const updatedSalesData = salesData.map((sale) =>
                //     sale.id === clientName.id ? { ...sale, done: 1 } : sale,
                // )
                // setSalesData(updatedSalesData)
            })
            .catch((error) => {
                console.error('Error updating order status:', error)
            })
    }

    return (
        <UniversalComponent>
            <Header>
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
            </Header>

            <Box width={'100%'} height={'94%'} p={5}>
                <Box
                    marginBottom={10}
                    height={'5%'}
                    display={'flex'}
                    justifyContent={'space-between'}
                >
                    <Box display={'flex'} gap={'15px'} width={'fit-content'}>
                        <DateRange />
                    </Box>
                </Box>
                <Box height={'calc(95% - 2.5rem)'}>
                    {salesData && (
                        <AccordionClients
                            data={salesData.filter((sale) => sale.done === 0)}
                            handleChangeStatus={handleChangeStatus}
                        />
                    )}
                </Box>
            </Box>
        </UniversalComponent>
    )
}

export default ProcessingPage
