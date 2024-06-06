import { Box, Button, Select, Text, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import { useApi } from '@/utils/services/axios'
import InvoiceModal from '../components/InvoiceModal'
import dayjs from 'dayjs'
import DateRange from '@/components/DateRange'
// import Header from '@/components/Header'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
// import { OverPriceType } from '@/utils/types/overPrice.types'

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

interface Client {
    id: number
    name: string
    surname: string
    contact: string
    telegrammId: string
    status: string
}

const InvoicePage = () => {
    const { setParam, getURLs } = useURLParameters()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { data: clientsData } = useApi<Client[]>('client')
    const { data: dispatchesData } = useApi<InvoiceData[]>(
        `release/invoice?${getURLs().toString()}`,
    )
    // const { data: overPriceData } = useApi<OverPriceType[]>(`overPrice`)

    const [selectedRow, setSelectedRow] = useState<InvoiceData | null>(null)

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target
        setParam(name, value)
    }

    return (
        <>
            <Box>
                <Box width={'100%'} height={'100%'} p={5} mt={2}>
                    <Box marginBottom={5} display={'flex'} justifyContent={'space-between'}>
                        <Box display={'flex'} gap={'15px'} width={'fit-content'}>
                            <DateRange />
                            <Select
                                placeholder="Реализатор"
                                width={'fit-content'}
                                size={'sm'}
                                borderRadius={5}
                                name="clientId"
                                onChange={handleSelectChange}
                            >
                                {clientsData?.map((client, index) => (
                                    <option key={index} value={client.id}>
                                        {client.name}
                                    </option>
                                ))}
                            </Select>
                        </Box>
                    </Box>
                    <Box
                        style={{
                            height: '100%',
                            width: '100%',
                            overflowX: 'auto',
                            overflowY: 'auto',
                            maxHeight: '78dvh',
                            minHeight: '78dvh',
                        }}
                    >
                        {dispatchesData?.length ? (
                            dispatchesData?.map((row, index) => {
                                const overPrice = 5000
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
                                        <Box
                                            display={'flex'}
                                            gap={10}
                                            textAlign={'start'}
                                            w={'35%'}
                                        >
                                            <Text w={'30%'} color={'gray'} fontWeight={''}>
                                                № {row.invoiceNumber}
                                            </Text>
                                            <Text w={'44%'}>{row.clientName}</Text>
                                            <Text w={'25%'}>
                                                {dayjs(row.createdAt).format('DD.MM.YYYY')}
                                            </Text>
                                        </Box>
                                        <Box display={'flex'} gap={20} w={'30%'}>
                                            <Text textAlign={'start'}>Сверху: {overPrice} ₸</Text>
                                            <Text textAlign={'start'}>Сумма: {row.totalSum} ₸</Text>
                                        </Box>
                                        <Text w={'12%'} textAlign={'start'}>
                                            Итого: {overPrice + row.totalSum} ₸
                                        </Text>
                                    </Button>
                                )
                            })
                        ) : (
                            <p>Данных о накладных пока нет</p>
                        )}
                    </Box>
                </Box>
            </Box>
            <InvoiceModal isOpen={isOpen} onClose={onClose} selectedRow={selectedRow} />
        </>
    )
}

export default InvoicePage
