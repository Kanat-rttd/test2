import Dialog from '@/components/Dialog'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Box, Select, Table, Tbody, Td, Text, Th, Tr, useDisclosure } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import DateRange from '../../../components/DateRange'
import IsMobile from '@/utils/helpers/isMobile'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { useApi } from '@/utils/services/axios'
import { TableContainer, Thead } from '@/components/ui'
import UniversalComponent from '@/components/ui/UniversalComponent'

export type History = {
    date: Date
    account: string
    amount: string
    financeCategory: {
        id: number
        name: string
        type: string
    }
    financeCategoryId: number
}

interface Finance {
    id: number
    amount: string
    date: Date
    financeCategory: {
        id: number
        name: string
        type: string
    }
    financeCategoryId: number
    clientId: number
    account: string
    comment: string
}

interface Category {
    id: number
    name: string
    type: string
}

interface Account {
    id: number
    name: string
}

const History = () => {
    const { getURLs, setParam, getParam } = useURLParameters()
    const [sortOrder, setSortOrder] = useState('asc')
    const [isHovered, setIsHovered] = useState(false)

    const { data: financeData } = useApi<Finance[]>(`finance?${getURLs().toString()}`)
    const { data: categoriesData } = useApi<Category[] | undefined>(`financeCategories`)
    const { data: accounts } = useApi<Account[]>('financeAccount')

    const [selectedData, setSelectedData] = useState<History | null>(null)
    const [data, setData] = useState<Finance[] | undefined>(undefined)
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        if (financeData) {
            setData(financeData)
        }
    }, [financeData])

    const sortData = (order: string) => {
        const sorted = financeData?.slice().sort((a, b) => {
            const dateA = new Date(a.date)
            const dateB = new Date(b.date)

            if (order === 'asc') {
                return dateA.getTime() - dateB.getTime()
            } else {
                return dateB.getTime() - dateA.getTime()
            }
        })

        setSortOrder(order)
        setData(sorted)
    }

    const handleMouseEnter = () => {
        setIsHovered(true)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
    }

    const handleDelete = (transaction: History) => {
        onOpen()
        setSelectedData(transaction)
    }

    return (
        <>
            <Box display='flex' flexDirection='column' gap='1rem' padding={IsMobile() ? 0 : 5}>
                <Box width='55%' gap='15px' mt={2} mb={1} display='flex'>
                    <DateRange />
                    <Select
                        placeholder='Все счета'
                        width='90%'
                        size='sm'
                        borderRadius={5}
                        value={getParam('accountName')}
                        onChange={(e) => setParam('accountName', e.target.value)}
                    >
                        {accounts?.map((account, index) => (
                            <option key={index} value={account.name}>
                                {account.name}
                            </option>
                        ))}
                    </Select>
                    <Select
                        placeholder='Все категории'
                        width='90%'
                        size='sm'
                        borderRadius={5}
                        value={getParam('categoryId')}
                        onChange={(e) => setParam('categoryId', e.target.value)}
                    >
                        {categoriesData?.map((category, index) => (
                            <option key={index} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </Select>
                </Box>

                <UniversalComponent>
                    <TableContainer style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
                        <Table variant='simple' width='100%'>
                            <Thead>
                                <Tr
                                    w='100%'
                                    position='sticky'
                                    top={0}
                                    backgroundColor='white'
                                    zIndex={9}
                                >
                                    <Th
                                        w='25%'
                                        onClick={() =>
                                            sortData(sortOrder === 'asc' ? 'desc' : 'asc')
                                        }
                                        style={{
                                            cursor: 'pointer',
                                            color: isHovered ? '#CCC' : 'black',
                                            transition: 'color 0.2s',
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        Дата
                                        {sortOrder === 'asc' ? (
                                            <ChevronDownIcon boxSize={6} />
                                        ) : (
                                            <ChevronUpIcon boxSize={6} />
                                        )}
                                    </Th>
                                    <Th w='20%'>Счёт</Th>
                                    <Th w='25%'>Категория</Th>
                                    <Th w='25%'>Комментарий</Th>
                                    <Th w='25%'>Сумма</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data?.length ? (
                                    data?.map((transaction, index) => (
                                        <Tr key={index} onClick={() => handleDelete(transaction)}>
                                            <Td>{dayjs(transaction.date).format('DD.MM.YYYY')}</Td>
                                            <Td>{transaction.account}</Td>
                                            <Td>{transaction.financeCategory.name}</Td>
                                            <Td>{transaction.comment}</Td>
                                            <Td>{transaction.amount}</Td>
                                        </Tr>
                                    ))
                                ) : (
                                    <Tr>
                                        <Td>Нет данных</Td>
                                        <Td></Td>
                                        <Td></Td>
                                        <Td></Td>
                                    </Tr>
                                )}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </UniversalComponent>

                <Dialog
                    isOpen={isOpen}
                    onClose={onClose}
                    header='Удалить запись?'
                    body={
                        <>
                            <Text>
                                <strong>Дата:</strong>{' '}
                                {dayjs(selectedData?.date).format('DD.MM.YYYY')}
                            </Text>
                            <Text>
                                <strong>Счет:</strong> {selectedData?.account}
                            </Text>
                            <Text>
                                <strong>Сумма:</strong> {selectedData?.amount}
                            </Text>
                            <Text>
                                <strong>Категория:</strong> {selectedData?.financeCategory.name}
                            </Text>
                        </>
                    }
                    actionBtn={() => console.log('Удалить')}
                    actionText='Удалить'
                />
            </Box>
        </>
    )
}

export default History
