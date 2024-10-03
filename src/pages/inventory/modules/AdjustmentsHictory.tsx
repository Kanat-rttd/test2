import { Table, Tr, Th, Tbody, Td, Box, Select, Tooltip } from '@chakra-ui/react'
import { TableContainer, Thead } from '@/components/ui'
import UniversalComponent from '@/components/ui/UniversalComponent'
import { useApi } from '@/utils/services/axios'
import dayjs from 'dayjs'

type AdjustmentType = {
    quantity: number
    goodsCategoryId: number
    createdAt: Date
    comment: string
    goodsCategory: {
        id: number
        category: string
        unitOfMeaseure: string
    }
}

const AdjustmentsHictory = () => {
    const { data: adjustmentData } = useApi<AdjustmentType[]>('adjustment')

    return (
        <>
            <UniversalComponent>
                <Box display='flex' flexDirection='column' p={5} mt={1}>
                    <Box marginBottom={5} display='flex' justifyContent='space-between'>
                        <Box display='flex' gap='15px' width='fit-content'>
                            <Select placeholder='Название' width='fit-content' name='status'>
                                <option value='1'>Активен</option>
                                <option value='0'>Приостановлен</option>
                            </Select>
                        </Box>
                    </Box>
                    <TableContainer style={{ width: '100%', overflowY: 'auto' }}>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>№</Th>
                                    <Th>Дата</Th>
                                    <Th>Категория товара</Th>
                                    <Th>Количество</Th>
                                    <Th maxWidth='200px'>Комментарий</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {adjustmentData?.length ? (
                                    adjustmentData?.map((item, index) => {
                                        return (
                                            <Tr key={index}>
                                                <Td>{index + 1}</Td>
                                                <Td>
                                                    {dayjs(item.createdAt).format('DD.MM.YYYY')}
                                                </Td>
                                                <Td>{item.goodsCategory.category}</Td>
                                                <Td>{item.quantity}</Td>
                                                <Td maxWidth='200px'>
                                                    <Tooltip label={item.comment}>
                                                        <Box
                                                            overflow='hidden'
                                                            whiteSpace='nowrap'
                                                            cursor='pointer'
                                                            textOverflow='ellipsis'
                                                        >
                                                            {item.comment}
                                                        </Box>
                                                    </Tooltip>
                                                </Td>
                                            </Tr>
                                        )
                                    })
                                ) : (
                                    <Tr>
                                        <Td>Нет данных</Td>
                                    </Tr>
                                )}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            </UniversalComponent>
        </>
    )
}

export default AdjustmentsHictory
