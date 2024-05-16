import { Box, Button, Select, Text, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import {
    SELLS_DEBT_ACCOUNTING_ROUTE,
    SELLS_DEBT_TRANSFER_ROUTE,
    SELLS_JOURNAL_ROUTE,
} from '@/utils/constants/routes.consts'
import { useApi } from '@/utils/services/axios'
import { useNavigate } from 'react-router-dom'
import InvoiceModal from '../components/InvoiceModal'
import dayjs from 'dayjs'
import DateRange from '@/components/DateRange'
import Header from '@/components/layout/Header'

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
                <Header>
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
                </Header>

                <Box width={'100%'} height={'100%'} p={5}>
                    <Box marginBottom={5} display={'flex'} justifyContent={'space-between'}>
                        <Box display={'flex'} gap={'15px'} width={'fit-content'}>
                            <DateRange />
                            <Select
                                placeholder="Реализатор"
                                width={'fit-content'}
                                size={'sm'}
                                borderRadius={5}
                            >
                                <option value="Лепешечный">Лепешечный</option>
                                <option value="Булочный">Булочный</option>
                                <option value="Заварной">Заварной</option>
                            </Select>
                            <Select
                                placeholder="Статус"
                                width={'fit-content'}
                                size={'sm'}
                                borderRadius={5}
                            >
                                <option value="Лепешечный">Лепешечный</option>
                                <option value="Булочный">Булочный</option>
                                <option value="Заварной">Заварной</option>
                            </Select>
                        </Box>
                    </Box>
                    <Box
                        style={{
                            height: '100%',
                            width: '100%',
                            overflowX: 'auto',
                            overflowY: 'auto',
                            maxHeight: '75dvh',
                            minHeight: '75dvh',
                        }}
                    >
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
