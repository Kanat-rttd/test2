import { Box, Button, Avatar, Select, Text, useDisclosure } from '@chakra-ui/react'
import Drawler from '@/components/Menu'
import { useState } from 'react'
import {
    SELLS_DEBT_ACCOUNTING_ROUTE,
    SELLS_DEBT_TRANSFER_ROUTE,
    SELLS_JOURNAL_ROUTE,
} from '@/utils/constants/routes.consts'
import DateRangePicker from '@/components/DateRangePicker'
import { useApi } from '@/utils/services/axios'
import { useNavigate } from 'react-router-dom'
import InvoiceModal from '../components/InvoiceModal'
import dayjs from 'dayjs'

interface financeTotalWithInvoiceNumbers {
    invoiceNumber: number
    totalAmount: number
}

interface InvoiceData {
    createdAt: Date
    clientId: number
    clientName: string
    invoiceNumber: number
    totalProducts: {
        id: number
        name: string
        price: number
        quantity: number
        totalPrice: number
    }[]
    totalSum: number
    dispatches: {
        id: number
        clientId: number
        createdAt: Date
        dispatch: number
        goodsDispatchDetails: {
            id: number
            productId: number
            quantity: number
            price: number | null
            product: {
                id: number
                name: string
                price: number
                bakingFacilityUnit: {
                    id: number
                    facilityUnit: string
                }
            }
        }[]
        client: {
            id: number
            name: string
        }
    }[]
}

const InvoicePage = () => {
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { data: financeTotals } = useApi<financeTotalWithInvoiceNumbers[]>('finance/totals')
    const { data: dispatchesData } = useApi<InvoiceData[]>('release/invoice')
    const [selectedRow, setSelectedRow] = useState<InvoiceData | null>(null)

    console.log(financeTotals)

    console.log(dispatchesData)

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
                            onClick={() => navigate(SELLS_JOURNAL_ROUTE)}
                        >
                            Журнал Продаж
                        </Button>
                        <Button bg={'rgba(217, 217, 217, 1)'} height={'100%'} width={'20%'}>
                            Накладной
                        </Button>
                        <Button
                            onClick={() => navigate(SELLS_DEBT_ACCOUNTING_ROUTE)}
                            height={'100%'}
                            width={'20%'}
                        >
                            Учёт долгов
                        </Button>
                        <Button
                            height={'100%'}
                            width={'20%'}
                            onClick={() => navigate(SELLS_DEBT_TRANSFER_ROUTE)}
                        >
                            Перевод долга
                        </Button>
                    </Box>
                    <Avatar size={'md'} bg="teal.500" />
                </Box>
                <Box width={'100%'} height={'100%'} p={5}>
                    <Box marginBottom={10} display={'flex'} justifyContent={'space-between'}>
                        <Box display={'flex'} gap={'15px'} width={'fit-content'}>
                            <DateRangePicker></DateRangePicker>
                            <Select placeholder="Реализатор" width={'fit-content'}>
                                <option value="Лепешечный">Лепешечный</option>
                                <option value="Булочный">Булочный</option>
                                <option value="Заварной">Заварной</option>
                            </Select>
                            <Select placeholder="Статус" width={'fit-content'}>
                                <option value="Лепешечный">Лепешечный</option>
                                <option value="Булочный">Булочный</option>
                                <option value="Заварной">Заварной</option>
                            </Select>
                        </Box>
                    </Box>
                    <Box>
                        {dispatchesData?.map((row, index) => {
                            const financeTotal = financeTotals?.find(
                                (item) => item.invoiceNumber === row.invoiceNumber,
                            )

                            const paymentStatus =
                                financeTotal && row.totalSum == financeTotal.totalAmount
                                    ? 'Оплачено'
                                    : 'Не оплачено'

                            return (
                                <Button
                                    key={index}
                                    w={'100%'}
                                    p={8}
                                    display={'flex'}
                                    justifyContent={'space-between'}
                                    border={'1px solid black'}
                                    borderRadius={0}
                                    onClick={() => {
                                        onOpen()
                                        setSelectedRow(row)
                                    }}
                                    marginBottom={1}
                                >
                                    <Text>{dayjs(row.createdAt).format('DD.MM.YYYY')}</Text>
                                    <Text>{row.totalSum}</Text>
                                    <Text>{paymentStatus}</Text>
                                </Button>
                            )
                        })}
                    </Box>
                </Box>
            </Box>
            <InvoiceModal
                isOpen={isOpen}
                onClose={onClose}
                selectedRow={selectedRow}
            ></InvoiceModal>
        </>
    )
}

export default InvoicePage
