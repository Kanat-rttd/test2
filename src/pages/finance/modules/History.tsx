import Dialog from '@/components/Dialog'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import {
    Box,
    Button,
    Select,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Tr,
    useDisclosure,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import DateRange from '../../../components/DateRange'
import IsMobile from '@/utils/helpers/isMobile'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { mutate, useApi } from '@/utils/services/axios'
import { TableContainer, Thead } from '@/components/ui'
import UniversalComponent from '@/components/ui/UniversalComponent'
import { useNotify } from '@/utils/hooks/useNotify.ts'
import { deleteFinance } from '@/utils/services/finance.service.ts'
import { generateExcel } from '@/utils/services/spreadsheet.service.ts'

export type History = {
    id: number
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

const History = () => {
    const { success, error } = useNotify()
    const { getURLs, setParam, getParam } = useURLParameters()
    const [sortOrder, setSortOrder] = useState('asc')
    const [isHovered, setIsHovered] = useState(false)

    const { data: financeData } = useApi<Finance[]>(`finance?${getURLs().toString()}`)
    const { data: categoriesData } = useApi<Category[] | undefined>(`financeCategories`)

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

    const handleDeleteConfirm = async () => {
        if (selectedData) {
            deleteFinance(selectedData.id)
                .then((res: any) => {
                    mutate(`finance?${getURLs().toString()}`)
                    success(res.data.message)
                })
                .catch((err: any) => {
                    error(err.response.data.error)
                })
        }
    }

    const exportExcel = async () => {
        if (data?.length === 0 || !data) {
            return error('Нет данных для экспорта')
        }

        const headers = ['№', 'Дата', 'Категория', 'Комментарий', 'Сумма']

        const formattedData = data.map((item, idx) => [
            idx + 1,
            new Date(item.date).toLocaleDateString(),
            item.financeCategory.name,
            item.comment,
            item.amount,
        ])

        const startDate = new Date(getParam('startDate')).toLocaleDateString()
        const endDate = new Date(getParam('endDate')).toLocaleDateString()

        await generateExcel(`История финансов с ${startDate} по ${endDate}`, [
            headers,
            ...formattedData,
        ])
    }

    return (
        <>
            <Box display='flex' flexDirection='column' gap='1rem' padding={IsMobile() ? 0 : 5}>
                <Box display='flex' justifyContent='space-between'>
                    <Box display='flex' gap='15px'>
                        <DateRange />
                        <Select
                            className='print-hidden'
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
                    <Box className='print-hidden' display='flex' gap='15px'>
                        <Button type='button' onClick={exportExcel}>
                            Экспорт в Excel
                        </Button>
                        <Button type='button' onClick={window.print}>
                            Экспорт в PDF
                        </Button>
                    </Box>
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
                    actionBtn={handleDeleteConfirm}
                    actionText='Удалить'
                />
            </Box>
        </>
    )
}

export default History
