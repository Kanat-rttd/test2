import { Box, Select, Table, Tr, Td, Tbody, Th, Button } from '@chakra-ui/react'
import { useApi } from '@/utils/services/axios'
import { TableContainer, Tfoot, Thead } from '@/components/ui'
import { useEffect, useState } from 'react'
import { useNotify } from '@/utils/hooks/useNotify.ts'
import { generateExcel } from '@/utils/services/spreadsheet.service.ts'

interface CalculationsData {
    Data: {
        ClientName: string
        Sales: number
        Returns: number
        Overhead: number
        Expenses: number
        Payments: number
        Credit: number
        Debt: number
    }[]
    Total: number
}

const ProviderTable = () => {
    const { error } = useNotify()
    const { data: calculationsData } = useApi<CalculationsData>('debtTransfer/calculations')
    const [filteredData, setFilteredData] = useState<
        {
            ClientName: string
            Sales: number
            Returns: number
            Overhead: number
            Expenses: number
            Payments: number
            Credit: number
            Debt: number
        }[]
    >([])

    const exportExcel = async () => {
        if (!filteredData || filteredData.length === 0) {
            return error('Нет данных для экспорта')
        }

        const headers = ['№', 'Реализатор', 'Сумма долга']
        const data = [headers]

        filteredData.forEach((item, idx) => {
            data.push([(idx + 1).toString(), item.ClientName, item.Debt.toString()])
        })

        data.push(['ИТОГО', '', calculationsData!.Total.toString()])

        await generateExcel('Учет долгов (Реализаторы)', data)
    }

    useEffect(() => {
        if (calculationsData) {
            const _filteredData = calculationsData.Data.filter((item) => item.Debt != 0)
            setFilteredData(_filteredData)
        }
    }, [calculationsData])

    return (
        <>
            <Box className='print-hidden' display='flex' marginBottom={4} gap='15px'>
                <Select placeholder='Реализатор' size='sm' borderRadius={5} width='20%'>
                    <option>Реализатор</option>
                </Select>

                <Button type='button' onClick={exportExcel}>
                    Экспорт в Excel
                </Button>
                <Button type='button' onClick={() => window.print()}>
                    Экспорт в PDF
                </Button>
            </Box>

            <Box style={filteredData && filteredData.length >= 7 ? { height: '100dvh' } : {}}>
                <TableContainer style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>№</Th>
                                <Th>Реализатор</Th>
                                <Th>Сумма долга</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {filteredData?.length ? (
                                filteredData?.map((item, index) => {
                                    return (
                                        <Tr key={index}>
                                            <Td>{index + 1}</Td>
                                            <Td>{item.ClientName}</Td>
                                            <Td>{item.Debt}</Td>
                                        </Tr>
                                    )
                                })
                            ) : (
                                <Tr>
                                    <Td>Нет данных</Td>
                                </Tr>
                            )}
                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Th color='#000' fontSize={15}>
                                    ИТОГО
                                </Th>
                                <Th width='60%'></Th>
                                <Th color='#000' fontSize={15}>
                                    {calculationsData?.Total}
                                </Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}

export default ProviderTable
