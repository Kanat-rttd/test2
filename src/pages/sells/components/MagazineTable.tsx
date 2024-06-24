import { TableContainer, Tfoot, Thead } from '@/components/ui'
import { Box, Select, Table, Tr, Td, Tbody, Th } from '@chakra-ui/react'
import { useApi } from '@/utils/services/axios'
import { useState } from 'react'

interface MagazineDebtView {
    mainData: [
        {
            MagazineName: string
            Debit: string
        },
    ]
    total: number
}

interface MagazineData {
    id: number
    name: string
    clientId: number
    status: string
}

const MagazineTable = () => {
    const [filters, setFilters] = useState({ MagazineName: '' })
    let count = 0

    const { data: magazineDebtData } = useApi<MagazineDebtView>('reports/magazineDebt', filters)
    const { data: magazinesData } = useApi<MagazineData[]>('magazines')

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }))
    }

    return (
        <>
            <Box width={'25%'} marginBottom={4}>
                <Select
                    name="MagazineName"
                    placeholder="Магазин"
                    width={'fit-content'}
                    onChange={handleSelectChange}
                    w={'80%'}
                    size={'sm'}
                    borderRadius={5}
                >
                    {magazinesData?.map((item, index) => (
                        <option key={index} value={item.name}>
                            {item.name}
                        </option>
                    ))}
                </Select>
            </Box>
            <Box
                style={
                    magazineDebtData?.mainData && magazineDebtData?.mainData.length >= 8
                        ? { height: '100dvh' }
                        : {}
                }
            >
                <TableContainer style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>№</Th>
                                <Th>Магазин</Th>
                                <Th>Сумма долга</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {magazineDebtData?.mainData.length ? (
                                magazineDebtData?.mainData.map((item, index) => {
                                    if (Number(item.Debit) != 0) {
                                        count += 1
                                        return (
                                            <Tr key={index}>
                                                <Td>{index + 1}</Td>
                                                <Td>{item.MagazineName}</Td>
                                                <Td>{item.Debit}</Td>
                                            </Tr>
                                        )
                                    }
                                })
                            ) : (
                                <Tr>
                                    <Td>Нет данных</Td>
                                </Tr>
                            )}
                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Th color={'#000'} fontSize={15}>
                                    ИТОГО
                                </Th>
                                <Th width={'60%'}> </Th>
                                <Th color={'#000'} fontSize={15}>
                                    {magazineDebtData?.total}
                                </Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}

export default MagazineTable
