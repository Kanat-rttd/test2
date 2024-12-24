import { TableContainer } from '@/components/ui'
import UniversalComponent from '@/components/ui/UniversalComponent'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { useApi } from '@/utils/services/axios'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Button, IconButton, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import dayjs from 'dayjs'

type GoodsCategory = {
    id: number
    category: string
    unitOfMeasure: string
    createdAt: Date
}

export default function GoodCategories() {
    const { getURLs } = useURLParameters()
    const { data: goodsCategories, isLoading } = useApi<GoodsCategory[]>(
        `goodsCategories?${getURLs()}`,
    )

    return (
        <UniversalComponent>
            <Box width='100%' height='100%' p={5}>
                <Box marginBottom={5} display='flex' justifyContent='space-between'>
                    <Box display='flex' gap='15px' width='fit-content'></Box>
                    <Button colorScheme='purple'>Добавить</Button>
                </Box>
                <TableContainer
                    isLoading={isLoading}
                    style={{ width: '100%', height: '100%', overflowY: 'auto' }}
                >
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>№</Th>
                                <Th>Название категории</Th>
                                <Th>Единица измерения</Th>
                                <Th>Дата добавления</Th>
                                <Th>Действия</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {goodsCategories?.length &&
                                goodsCategories.map((category, index) => {
                                    return (
                                        <Tr key={category.id}>
                                            <Td>{index + 1}</Td>
                                            <Td>{category.category}</Td>
                                            <Td>{category.unitOfMeasure}</Td>
                                            <Td>
                                                {dayjs(category.createdAt).format('DD.MM.YYYY')}
                                            </Td>
                                            <Td sx={{ width: '5%' }}>
                                                <IconButton
                                                    variant='outline'
                                                    size='sm'
                                                    colorScheme='teal'
                                                    aria-label='Send email'
                                                    marginRight={3}
                                                    icon={<EditIcon />}
                                                />
                                                <IconButton
                                                    variant='outline'
                                                    size='sm'
                                                    colorScheme='teal'
                                                    aria-label='Send email'
                                                    marginRight={3}
                                                    onClick={() => {}}
                                                    icon={<DeleteIcon />}
                                                />
                                            </Td>
                                        </Tr>
                                    )
                                })}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </UniversalComponent>
    )
}

