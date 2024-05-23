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

    const { data: magazineDebtData } = useApi<MagazineDebtView>('reports/magazineDebt', filters)
    const { data: magazinesData } = useApi<MagazineData[]>('magazines')

    console.log(magazinesData)

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }))
    }

    return (
        <>
            <Box width={'25%'} marginBottom={6}>
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
            <Box>
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
                            {magazineDebtData?.mainData.map((item, index) => {
                                return (
                                    <Tr key={index}>
                                        <Td>{index + 1}</Td>
                                        <Td>{item.MagazineName}</Td>
                                        <Td>{item.Debit}</Td>
                                    </Tr>
                                )
                            })}
                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Th color={'#000'} fontSize={15}>
                                    ИТОГО
                                </Th>
                                <Th> </Th>
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
