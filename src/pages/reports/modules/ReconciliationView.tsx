import DateRange from '@/components/DateRange'
import { TableContainer, Thead } from '@/components/ui'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { useApi } from '@/utils/services/axios'
import { Box, Button, Select, Table, Tbody, Td, Th, Tr } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { useEffect } from 'react'

type ReportData = {
    fullReports: {
        adjustedDate: string
        sales: number
        returns: number
        overhead: string
        payments: string
        magazines: { [x: string]: number }[]
    }[]
    allMagazines: string[]
}

interface Contragent {
    id: number
    contragentName: string
    contragentTypeId: number
}

export default function ReconciliationView() {
    const { getURLs, getParam, setParam } = useURLParameters()

    const { data: contragents } = useApi<Contragent[]>('contragent')
    const { data } = useApi<ReportData>(`reports/reconciliation?${getURLs().toString()}`)

    useEffect(() => {
        if (!getParam('contragentId')) {
            setParam('contragentId', contragents?.[0].id.toString()!)
        }
    })

    const exportExcel = () => {}

    return (
        <Box>
            <Box width='100%' height='100%' p={5} mt={1}>
                <Box
                    className='print-hidden'
                    marginBottom={6}
                    display='flex'
                    justifyContent='space-between'
                >
                    <Box display='flex' gap='15px' width='100%'>
                        <DateRange />
                        <Select
                            className='print-hidden'
                            size='sm'
                            borderRadius={5}
                            width='fit-content'
                            value={getParam('contragentId')}
                            onChange={(e) => setParam('contragentId', e.target.value)}
                        >
                            {contragents
                                ?.filter((c) => c.contragentTypeId === 1)
                                .map((client) => (
                                    <option key={client.id} value={client.id}>
                                        {client.contragentName}
                                    </option>
                                ))}
                        </Select>
                    </Box>
                    <Box display='flex' gap='15px'>
                        <Button type='button' onClick={exportExcel}>
                            Экспорт в Excel
                        </Button>
                        <Button type='button' onClick={() => window.print()}>
                            Экспорт в PDF
                        </Button>
                    </Box>
                </Box>
                <Box>
                    <TableContainer style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>№</Th>
                                    <Th>Дата</Th>
                                    <Th>Продажи</Th>
                                    <Th>Возврат</Th>
                                    <Th>Выплата</Th>
                                    <Th>Сверху</Th>
                                    {data?.allMagazines.map((item) => <Th key={item}>{item}</Th>)}
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data?.fullReports?.length ? (
                                    data.fullReports.map((item, index) => (
                                        <Tr key={item.adjustedDate}>
                                            <Td>{index + 1}</Td>
                                            <Td>{dayjs(item.adjustedDate).format('DD.MM.YYYY')}</Td>
                                            <Td>{(item.sales || 0).formatted()}</Td>
                                            <Td>{(item.returns || 0).formatted()}</Td>
                                            <Td>{(+item.payments || 0).formatted()}</Td>
                                            <Td>{(+item.overhead || 0).formatted()}</Td>
                                            {data.allMagazines.map((am) => (
                                                // @ts-ignore
                                                <Td key={am}>{item.magazines[am]}</Td>
                                            ))}
                                        </Tr>
                                    ))
                                ) : (
                                    <Tr>
                                        <Td>Нет данных</Td>
                                    </Tr>
                                )}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Box>
    )
}

