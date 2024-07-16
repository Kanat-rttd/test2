import { Table, Tr, Th, Tbody, Td, Box, Select } from '@chakra-ui/react'
import { TableContainer, Tfoot, Thead } from '@/components/ui'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import DateRange from '@/components/DateRange'
import UniversalComponent from '@/components/ui/UniversalComponent'
import { useApi } from '@/utils/services/axios'

const data = [
    {
        id: 1,
        name: 'Мука',
        remainOnTheBeginning: 100,
        baking: 100,
        sells: 100,
        defective: 500,
        remainOnTheEnd: 100,
    },
    {
        id: 1,
        name: 'Картошка',
        remainOnTheBeginning: 100,
        baking: 100,
        sells: 100,
        defective: 500,
        remainOnTheEnd: 100,
    },
]

const RemainProducts = () => {
    const { getURLs } = useURLParameters()
    const { data: remainRawMaterials } = useApi(
        `reports/remainRawMaterials?${getURLs().toString()}`,
    )

    console.log(remainRawMaterials)

    return (
        <UniversalComponent>
            <Box display="flex" flexDirection="column" p={5} mt={1}>
                <Box marginBottom={5} display={'flex'} justifyContent={'space-between'}>
                    <Box display={'flex'} gap={'15px'} width={'fit-content'}>
                        <DateRange />
                        <Select
                            size={'sm'}
                            borderRadius={5}
                            placeholder="Название"
                            width={'fit-content'}
                            name="status"
                        >
                            <option value="1">Активен</option>
                            <option value="0">Приостановлен</option>
                        </Select>
                    </Box>
                </Box>
                <TableContainer style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>№</Th>
                                <Th>Название</Th>
                                <Th>Остаток на начало</Th>
                                <Th>Выпечка</Th>
                                <Th>Продажи</Th>
                                <Th>Брак</Th>
                                <Th>Остаток на конец</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.length ? (
                                data.map((product, index) => {
                                    return (
                                        <Tr key={index + 1}>
                                            <Td>{index + 1}</Td>
                                            <Td>{product.name}</Td>
                                            <Td>{product.remainOnTheBeginning}</Td>
                                            <Td>{product.baking}</Td>
                                            <Td>{product.sells}</Td>
                                            <Td>{product.defective}</Td>
                                            <Td>{product.remainOnTheEnd}</Td>
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
                            <Tr color={'#000'} fontSize={15} fontWeight={'bold'}>
                                <Td>Итого</Td>
                                <Td></Td>
                                <Td>100</Td>
                                <Td>100</Td>
                                <Td>100</Td>
                                <Td>100</Td>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </Box>
        </UniversalComponent>
    )
}

export default RemainProducts
