import { useEffect, useState } from 'react'
import {
    Box,
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Tfoot,
    Button,
    Avatar,
    Select,
    useDisclosure,
    IconButton,
} from '@chakra-ui/react'
import { getAllBakings } from '@/utils/services/baking.service'
import { useNavigate } from 'react-router-dom'
import { MIXERS_PASTRY_ROUTE } from '@/utils/constants/routes.consts'
import Drawler from '@/components/Drawler'
import BakingAddModal from '../components/BakingAddModal'
import DateRangePicker from '@/components/DateRangePicker'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'

interface Baking {
    breadType: string
    flour: number
    salt: number
    yeast: number
    malt: number
    butter: number
    temperature: number
    time: Date
    output: number
    spoilage: number
}

interface BakingTotals {
    totalButter: number
    totalFlour: number
    totalMalt: number
    totalOutput: number
    totalSalt: number
    totalYeast: number
}

const styles = {
    fontSize: '15px',
    borderBottom: '1px solid black',
    textAlign: 'center',
    fontWeight: 'bold',
}

const BakingPage = () => {
    const { onOpen, onClose, isOpen } = useDisclosure()
    const navigate = useNavigate()
    const [backgroundCol, setColor] = useState('rgba(217, 217, 217, 1)')
    const [selectedBaking, setSelectedBaking] = useState<Baking | null>(null)
    const [bakingData, setBakingData] = useState<Baking[]>()

    const [totals, setTotals] = useState<BakingTotals | null>(null)

    useEffect(() => {
        getAllBakings().then((res) => {
            console.log(res)

            setBakingData(res.bakingData)
            setTotals(res.totals)
        })
    }, [])

    return (
        <>
            <Box>
                <Box
                    display="flex"
                    justifyContent={'space-between'}
                    flexDirection={'row'}
                    backgroundColor={'rgba(128, 128, 128, 0.1)'}
                >
                    <Box width={'100%'}>
                        <Drawler></Drawler>
                        <Button
                            height={'100%'}
                            width={'20%'}
                            onClick={() => navigate(MIXERS_PASTRY_ROUTE)}
                        >
                            Заявки
                        </Button>
                        <Button bg={backgroundCol} height={'100%'} width={'20%'}>
                            Выпечка
                        </Button>
                    </Box>
                    <Avatar size={'md'} bg="teal.500" />
                </Box>
                <Box width={'100%'} height={'100%'} p={5}>
                    <Box textAlign={'right'}>
                        <Button
                            size={'lg'}
                            backgroundColor={'#6B6FDB'}
                            color={'white'}
                            fontSize={'20px'}
                            borderRadius={'20px'}
                            width={'15%'}
                            onClick={() => {
                                setSelectedBaking(null)
                                onOpen()
                            }}
                        >
                            Добавить
                        </Button>
                        <BakingAddModal data={selectedBaking} isOpen={isOpen} onClose={onClose} />
                    </Box>
                    <Box marginBottom={10} display={'flex'} justifyContent={'space'}>
                        <DateRangePicker></DateRangePicker>
                        <Select placeholder="Цехи" width={'20%'} marginLeft={20}>
                            <option value="Лепешечный">Лепешечный</option>
                            <option value="Булочный">Булочный</option>
                            <option value="Заварной">Заварной</option>
                        </Select>
                    </Box>
                    <Box backgroundColor={'rgba(255, 255, 255, 1)'} width={'100%'} height={'100%'}>
                        <TableContainer maxWidth={'100%'} width={'100%'} overflowY={'scroll'}>
                            <Table
                                size="sm"
                                variant="unstyled"
                                overflow={'scroll'}
                                style={{ borderCollapse: 'separate', borderSpacing: '0 10px' }}
                            >
                                <Thead>
                                    <Tr>
                                        <Th borderBottom={'1px solid black'} fontSize={'15px'}>
                                            Вид хлеба
                                        </Th>
                                        <Th sx={styles} isNumeric>
                                            Мука
                                        </Th>
                                        <Th sx={styles} isNumeric>
                                            Соль
                                        </Th>
                                        <Th sx={styles} isNumeric>
                                            Дрожжи
                                        </Th>
                                        <Th sx={styles} isNumeric>
                                            Солод
                                        </Th>
                                        <Th sx={styles} isNumeric>
                                            Масло
                                        </Th>
                                        <Th sx={styles} isNumeric>
                                            t°
                                        </Th>
                                        <Th sx={styles} isNumeric>
                                            Время
                                        </Th>
                                        <Th sx={styles} isNumeric>
                                            Выход
                                        </Th>
                                        <Th sx={styles} isNumeric>
                                            Действия
                                        </Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {bakingData?.map((bakingRow, index) => {
                                        return (
                                            <Tr key={index}>
                                                <Td>{bakingRow.product.name}</Td>
                                                <Td>{bakingRow.flour}</Td>
                                                <Td>{bakingRow.salt}</Td>
                                                <Td>{bakingRow.yeast}</Td>
                                                <Td>{bakingRow.malt}</Td>
                                                <Td>{bakingRow.butter}</Td>
                                                <Td>{bakingRow.temperature}</Td>
                                                <Td>{bakingRow.time}</Td>
                                                <Td>{bakingRow.output}</Td>
                                                <Td>
                                                    <IconButton
                                                        backgroundColor="#242423"
                                                        marginRight={1}
                                                        color={'white'}
                                                        aria-label="Edit"
                                                        onClick={() => {
                                                            console.log(bakingRow)
                                                            setSelectedBaking(bakingRow)
                                                            onOpen()
                                                        }}
                                                        icon={<EditIcon />}
                                                    />
                                                    <IconButton
                                                        backgroundColor="#DC3545"
                                                        color={'white'}
                                                        aria-label="Delete button"
                                                        icon={<DeleteIcon />}
                                                    />
                                                </Td>
                                            </Tr>
                                        )
                                    })}
                                </Tbody>
                                <Tfoot>
                                    <Tr>
                                        <Td style={{ borderTop: '1px solid black' }} width={'80%'}>
                                            Итого
                                        </Td>
                                        <Td style={{ borderTop: '1px solid black' }}>
                                            {totals?.totalFlour}
                                        </Td>
                                        <Td style={{ borderTop: '1px solid black' }}>
                                            {totals?.totalSalt}
                                        </Td>
                                        <Td style={{ borderTop: '1px solid black' }}>
                                            {totals?.totalYeast}
                                        </Td>
                                        <Td style={{ borderTop: '1px solid black' }}>
                                            {totals?.totalMalt}
                                        </Td>
                                        <Td style={{ borderTop: '1px solid black' }}>
                                            {totals?.totalButter}
                                        </Td>
                                        <Td style={{ borderTop: '1px solid black' }}></Td>
                                        <Td style={{ borderTop: '1px solid black' }}></Td>
                                        <Td style={{ borderTop: '1px solid black' }}>
                                            {totals?.totalOutput}
                                        </Td>
                                        <Td style={{ borderTop: '1px solid black' }}></Td>
                                    </Tr>
                                </Tfoot>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default BakingPage
