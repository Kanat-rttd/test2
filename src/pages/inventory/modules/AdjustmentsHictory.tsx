import { Table, Tr, Th, Tbody, Td, Box, Select, Tooltip, Button } from '@chakra-ui/react'
import { TableContainer, Thead } from '@/components/ui'
import UniversalComponent from '@/components/ui/UniversalComponent'
import { useApi } from '@/utils/services/axios'
import dayjs from 'dayjs'
import { useNotify } from '@/utils/hooks/useNotify.ts'
import { generateExcel } from '@/utils/services/spreadsheet.service.ts'

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
    const { error } = useNotify()
    const { data: adjustmentData } = useApi<AdjustmentType[]>('adjustment')

    const exportExcel = async () => {
        if (!adjustmentData || adjustmentData.length === 0) {
            return error('Нет данных для экспорта')
        }

        const headers = ['№', 'Дата', 'Категория товара', 'Количество', 'Комментарий']
        const data = [
            headers,
            ...adjustmentData.map((item, idx) => [
                idx + 1,
                new Date(item.createdAt).toLocaleDateString(),
                item.goodsCategory.category,
                item.quantity,
                item.comment,
            ]),
        ]

        await generateExcel('История корректировок', data)
    }

    return (
        <>
            <UniversalComponent>
                <Box display='flex' flexDirection='column' p={5} mt={1}>
                    <Box
                        className='print-hidden'
                        marginBottom={5}
                        display='flex'
                        justifyContent='space-between'
                    >
                        <Box display='flex' gap='15px' width='fit-content'>
                            <Select placeholder='Название' width='fit-content' name='status'>
                                <option value='1'>Активен</option>
                                <option value='0'>Приостановлен</option>
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
