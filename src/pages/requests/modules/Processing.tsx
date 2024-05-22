import { Box } from '@chakra-ui/react'
import AccordionClients from '@/components/AccordionClients'
// import { getAllSales } from '@/utils/services/sales.service'
import { setDoneStatus } from '@/utils/services/sales.service'
import DateRange from '@/components/DateRange'

import { useApi } from '@/utils/services/axios'
import UniversalComponent from '@/components/ui/UniversalComponent'
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

    const { data: salesData, mutate: mutateSalesData } = useApi<OrderArray[]>(
        `sales?${getURLs().toString()}`,
    )

    const handleChangeStatus = async (clientName: OrderArray) => {
        setDoneStatus(clientName.id)
            .then((res) => {
                console.log(res)
                mutateSalesData()
            })
            .catch((error) => {
                console.error('Error updating order status:', error)
            })
    }

    return (
        <UniversalComponent>
            <Box width={'100%'} height={'94%'} p={5} mt={1}>
                <Box
                    marginBottom={5}
                    height={'5%'}
                    display={'flex'}
                    justifyContent={'space-between'}
                >
                    <Box display={'flex'} gap={'15px'} width={'fit-content'}>
                        <DateRange />
                    </Box>
                </Box>
                <Box>
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
