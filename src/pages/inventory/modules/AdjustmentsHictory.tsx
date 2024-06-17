import { Table, Tr, Th, Tbody, Td, Box, Select } from '@chakra-ui/react'
import { TableContainer, Tfoot, Thead } from '@/components/ui'
import UniversalComponent from '@/components/ui/UniversalComponent'
import { useApi } from '@/utils/services/axios'
import dayjs from 'dayjs'

type AdjustmentType = {
    quantity: number
    providerGoodId: number
    createdAt: Date
}

const AdjustmentsHictory = () => {
    const { data: adjustmentData } = useApi<AdjustmentType[]>('adjustment')
    return (
        <>
            <UniversalComponent>
                <Box display="flex" flexDirection="column" p={5} mt={1}>
                    <Box marginBottom={5} display={'flex'} justifyContent={'space-between'}>
                        <Box display={'flex'} gap={'15px'} width={'fit-content'}>
                            <Select placeholder="Название" width={'fit-content'} name="status">
                                <option value="1">Активен</option>
                                <option value="0">Приостановлен</option>
                            </Select>
                        </Box>
                    </Box>
                    <TableContainer style={{ width: '100%', overflowY: 'auto' }}>
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>№</Th>
                                    <Th>Дата</Th>
                                    <Th>Товар</Th>
                                    <Th>Количество</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {adjustmentData?.map((item, index) => {
                                    return (
                                        <Tr key={index}>
                                            <Td>{dayjs(item.createdAt).format('DD.MM.YYYY')}</Td>
                                            <Td>{item.providerGoodId}</Td>
                                            <Td>{item.quantity}</Td>
                                        </Tr>
                                    )
                                })}
                            </Tbody>
                            <Tfoot>
                                <Tr color={'#000'} fontSize={15} fontWeight={'bold'}>
                                    <Td>Итого</Td>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td>100</Td>
                                </Tr>
                            </Tfoot>
                        </Table>
                    </TableContainer>
                </Box>
            </UniversalComponent>
        </>
    )
}

export default AdjustmentsHictory
