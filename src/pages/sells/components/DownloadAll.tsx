import { OverPriceType } from '@/utils/types/overPrice.types'
import { Box, Button, Divider, Table, Tbody, Td, Th, Thead, Tr, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'

interface InvoiceData {
    createdAt: Date
    contragentId: number
    contragentName: string
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
        contragentId: number
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
        contragent: {
            id: number
            contragentName: string
        }
    }[]
}

interface Props {
    invoices?: InvoiceData[]
    overPrices?: OverPriceType[]
}

export const DownloadAll = ({ invoices, overPrices }: Props) => {
    return (
        <>
            <Button className='print-hidden' onClick={window.print}>
                Скачать все
            </Button>

            <Box id='c' w={'100%'} display='none' className='print-visible'>
                {invoices?.map((invoice) => {
                    const overPrice =
                        overPrices?.find((price) => price.contragentId == invoice.contragentId)
                            ?.price || 0
                    return (
                        <Box className='avoid_break' fontSize={12} py={3} px={8}>
                            <Box display='flex' justifyContent='space-between'>
                                <Text>#{invoice?.invoiceNumber}</Text>
                            </Box>
                            <Box display='flex' justifyContent='space-between' p={2} pb={2}>
                                <Text>Расходная накладная от</Text>
                                <Text>{dayjs(invoice?.createdAt).format('DD.MM.YYYY')}</Text>
                            </Box>
                            <Divider
                                size='lg'
                                borderColor='black'
                                borderWidth='2px'
                                orientation='horizontal'
                            />
                            <Box display='flex' justifyContent='space-between' pt={1} p={2} pb={3}>
                                <Box
                                    display='flex'
                                    justifyContent='space-between'
                                    flexDirection='column'
                                >
                                    <Text>Получатель</Text>
                                    <Text>Покупатель</Text>
                                </Box>
                                <Box
                                    display='flex'
                                    flexDirection='column'
                                    justifyContent='space-between'
                                >
                                    <Text></Text>
                                    <Text>{invoice?.contragentName}</Text>
                                </Box>
                            </Box>
                            <Divider
                                size='lg'
                                borderColor='black'
                                borderWidth='2px'
                                orientation='horizontal'
                                marginBottom={3}
                            />
                            <Table size='xs' variant='unstyled' fontSize='10px'>
                                <Thead>
                                    <Tr>
                                        <Th border='none' color='RGB(108, 112, 219)'>
                                            Продукция
                                        </Th>
                                        <Th border='none' color='RGB(108, 112, 219)'>
                                            Количество
                                        </Th>
                                        <Th border='none' color='RGB(108, 112, 219)'>
                                            Цена
                                        </Th>
                                        <Th border='none' color='RGB(108, 112, 219)'>
                                            Сумма
                                        </Th>
                                    </Tr>
                                    <Tr height={2}></Tr>
                                </Thead>
                                <Tbody>
                                    {invoice?.totalProducts.map((item, index) => (
                                        <Tr key={index}>
                                            <Td border='1px solid black' padding='1'>
                                                {item.name}
                                            </Td>
                                            <Td border='1px solid black' padding='1'>
                                                {item.quantity}
                                            </Td>
                                            <Td border='1px solid black' padding='1'>
                                                {item.price}
                                            </Td>
                                            <Td border='1px solid black' padding='1'>
                                                {item.totalPrice}
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                            <Box fontSize={12} display='flex' marginBottom={3} mt={3}>
                                <Text marginLeft='auto'>Получено</Text>
                                <Text>________</Text>
                            </Box>
                            <Box fontSize={12} display='flex' flexDirection='column'>
                                <Text marginLeft='auto' fontWeight='bold'>
                                    Сверху: {overPrice} тг
                                </Text>
                                <Text marginLeft='auto' fontWeight='bold'>
                                    Всего: {Number(invoice?.totalSum) + Number(overPrice)} тг
                                </Text>
                            </Box>
                        </Box>
                    )
                })}
            </Box>
        </>
    )
}

