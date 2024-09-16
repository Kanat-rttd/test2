import { useEffect, useState } from 'react'
import { Box, Select, Td, Th, Tr, Tbody, Table } from '@chakra-ui/react'
import { useApi } from '@/utils/services/axios'
import DateRange from '../../../components/DateRange'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { TableContainer, Tfoot, Thead } from '@/components/ui'
import dayjs from 'dayjs'

interface BreadViewData {
    reportData: ReportDataType[]
    totals: { name: string; totalQuantity: number }[]
}

type ReportDataType = {
    contragentName: string
    name: string
    adjustedDate: Date
    SalesQuantity: number
}

interface Client {
    id: string
    name: string
    surname: string
    contact: string
    telegrammId: string
    status: string
}

type FilteredData = {
    date: string
    products: {
        productName: string
        totalQuantity: number
    }[]
}

const BreadView = () => {
    const { getURLs, setParam, getParam } = useURLParameters()
    const { data: breadViewData } = useApi<BreadViewData>(`reports/sales?${getURLs().toString()}`)
    const { data: clientsData } = useApi<Client[]>('client')
    const [productsNames, setProductsNames] = useState<string[]>([])
    const [dates, setDates] = useState<Date[]>([])
    const [filteredProducts, setFilteredProducts] = useState<FilteredData[] | undefined>([])

    const getUniqDates = () => {
        const uniqDates = new Set<Date>()
        breadViewData?.reportData?.forEach((item) => {
            uniqDates.add(item.adjustedDate)
        })
        return [...uniqDates]
    }

    const getProductsNames = () => {
        const productNames = new Set<string>()
        breadViewData?.reportData?.forEach((entry) => {
            productNames.add(entry.name)
        })
        return [...productNames]
    }

    const getFilteredProducts = (): FilteredData[] => {
        if (!breadViewData?.reportData) return []

        const groupedData: { [date: string]: { productName: string; totalQuantity: number }[] } = {}

        breadViewData.reportData.forEach((entry) => {
            const dateKey = dayjs(entry.adjustedDate).format('DD.MM.YYYY')
            if (!groupedData[dateKey]) {
                groupedData[dateKey] = []
            }
            const existingProductIndex = groupedData[dateKey].findIndex(
                (productEntry) => productEntry.productName === entry.name,
            )
            if (existingProductIndex === -1) {
                groupedData[dateKey].push({
                    productName: entry.name,
                    totalQuantity: Number(entry.SalesQuantity),
                })
            } else {
                groupedData[dateKey][existingProductIndex].totalQuantity += Number(
                    entry.SalesQuantity,
                )
            }
        })

        const result: FilteredData[] = Object.keys(groupedData).map((date) => ({
            date,
            products: groupedData[date],
        }))

        return result
    }

    useEffect(() => {
        setDates(getUniqDates())
        setProductsNames(getProductsNames())
    }, [breadViewData])

    useEffect(() => {
        setFilteredProducts(getFilteredProducts())
    }, [productsNames, dates])

    return (
        <Box>
            <Box width='100%' height='100%' p={5} mt={1}>
                <Box marginBottom={6} display='flex' justifyContent='space-between'>
                    <Box display='flex' gap='15px' width='100%'>
                        <DateRange />
                        <Select
                            size='sm'
                            borderRadius={5}
                            width='fit-content'
                            value={getParam('contragentName')}
                            onChange={(e) => setParam('contragentName', e.target.value)}
                        >
                            <option value=''>Все клиенты</option>
                            {clientsData?.map((client) => (
                                <option key={client.id} value={client.name}>
                                    {client.name}
                                </option>
                            ))}
                        </Select>
                    </Box>
                </Box>
                <Box>
                    <TableContainer style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>№</Th>
                                    <Th>Дата</Th>
                                    {productsNames.map((product, index) => (
                                        <Th key={index}>{product}</Th>
                                    ))}
                                </Tr>
                            </Thead>
                            <Tbody>
                                {filteredProducts?.length ? (
                                    filteredProducts?.map((entry, index) => (
                                        <Tr key={index}>
                                            <Td>{index + 1}</Td>
                                            <Td>{entry.date}</Td>
                                            {productsNames.map((name, productIndex) => (
                                                <Td key={productIndex}>
                                                    {entry.products.find(
                                                        (prod) => prod.productName === name,
                                                    )?.totalQuantity || 0}
                                                </Td>
                                            ))}
                                        </Tr>
                                    ))
                                ) : (
                                    <Tr>
                                        <Td>Нет данных</Td>
                                    </Tr>
                                )}
                            </Tbody>
                            <Tfoot>
                                <Tr>
                                    <Th fontSize={15} color='#000'>
                                        ИТОГО
                                    </Th>
                                    <Th></Th>
                                    {productsNames.map((productName, index) => {
                                        const total = breadViewData?.totals.find(
                                            (item) => item.name === productName,
                                        )?.totalQuantity
                                        return (
                                            <Th key={index} fontSize={15} color='#000'>
                                                {total}
                                            </Th>
                                        )
                                    })}
                                </Tr>
                            </Tfoot>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Box>
    )
}

export default BreadView
