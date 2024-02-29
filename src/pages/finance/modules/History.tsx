import Dialog from '@/components/Dialog'
import Drawler from '@/components/Drawler'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import {
    Avatar,
    Box,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useDisclosure,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import { useState } from 'react'
import DateRange from '../../../components/DateRange'
import IsMobile from '@/utils/helpers/isMobile'

export type History = {
    date: string
    account: string
    category: string
    sum: number
}

const History = () => {
    const [sortOrder, setSortOrder] = useState('asc')
    const [isHovered, setIsHovered] = useState(false)
    const [data, setData] = useState([
        {
            date: '2024-02-28',
            account: 'Kaspi',
            category: 'Расходы',
            sum: 10000,
        },
        {
            date: '2024-02-27',
            account: 'Kaspi',
            category: 'Расходы',
            sum: 10000,
        },
    ])
    const [selectedData, setSelectedData] = useState<History | null>(null)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
    })

    const sortData = (order: string) => {
        const sorted = data.slice().sort((a, b) => {
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
            <Box
                display="flex"
                justifyContent={'space-between'}
                flexDirection={'row'}
                backgroundColor={'rgba(128, 128, 128, 0.1)'}
            >
                <Box width={'100%'}>
                    <Drawler></Drawler>
                </Box>
                <Avatar bg="teal.500" />
            </Box>
            <Box display="flex" flexDirection="column" gap="1rem" padding={IsMobile() ? 0 : 10}>
                <Box width={'250px'}>
                    <DateRange
                        selectionRange={selectionRange}
                        setSelectionRange={setSelectionRange}
                    />
                </Box>
                <TableContainer
                    maxHeight={700}
                    overflow={'auto'}
                    borderRadius={'5px'}
                    width={'100%'}
                    background={'#fff'}
                    boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'}
                >
                    <Table variant="simple">
                        <Thead
                            position={'sticky'}
                            top={0}
                            background={'#fff'}
                            zIndex={'1'}
                            boxShadow={'rgba(0, 0, 0, 0.1) 0px 1px 1px'}
                        >
                            <Tr>
                                <Th
                                    onClick={() => sortData(sortOrder === 'asc' ? 'desc' : 'asc')}
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
                                    Дата{' '}
                                    {sortOrder === 'asc' ? (
                                        <ChevronDownIcon boxSize={6} />
                                    ) : (
                                        <ChevronUpIcon boxSize={6} />
                                    )}
                                </Th>
                                <Th>Счёт</Th>
                                <Th>Категория</Th>
                                <Th>Сумма</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map((transaction, index) => (
                                <Tr key={index} onClick={() => handleDelete(transaction)}>
                                    <Td>{dayjs(transaction.date).format('DD.MM.YYYY')}</Td>
                                    <Td>{transaction.account}</Td>
                                    <Td>{transaction.category}</Td>
                                    <Td>{transaction.sum}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
                <Dialog
                    isOpen={isOpen}
                    onClose={onClose}
                    header="Удалить запись?"
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
                                <strong>Сумма:</strong> {selectedData?.sum}
                            </Text>
                            <Text>
                                <strong>Категория:</strong> {selectedData?.category}
                            </Text>
                        </>
                    }
                    actionBtn={() => console.log('Удалить')}
                    actionText="Удалить"
                />
            </Box>
        </>
    )
}

export default History
