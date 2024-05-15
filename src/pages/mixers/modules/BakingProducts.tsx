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
    Select,
    useDisclosure,
    IconButton,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { MIXERS_PASTRY_ROUTE } from '@/utils/constants/routes.consts'
import BakingAddModal from '../components/BakingAddModal'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import UniversalComponent from '@/components/ui/UniversalComponent'
import DateRange from '@/components/DateRange'
import { useApi } from '@/utils/services/axios'
import Header from '@/components/Header'

interface Baking {
    bakingData: bakingsData[]
    totals: BakingTotals
}

interface bakingsData {
    breadType: string
    flour: string
    salt: string
    yeast: string
    malt: string
    butter: string
    temperature: string
    time: string
    output: string
    product?: {
        name: string
        id: string
    }
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
    const [selectedBaking, setSelectedBaking] = useState<bakingsData | null>(null)

    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
    })

    useEffect(() => {
        console.log(selectionRange.startDate)
        console.log(selectionRange.endDate)
    }, [selectionRange])

    const { data: bakingsData } = useApi<Baking>('baking', {
        startDate: String(selectionRange.startDate),
        endDate: String(selectionRange.endDate),
    })

    console.log(bakingsData)

    return (
        <>
            <UniversalComponent>
                <Header>
                    <Button
                        height={'100%'}
                        width={'20%'}
                        onClick={() => navigate(MIXERS_PASTRY_ROUTE)}
                    >
                        Заявки
                    </Button>
                    <Button bg={'rgba(217, 217, 217, 1)'} height={'100%'} width={'20%'}>
                        Выпечка
                    </Button>
                </Header>

                <Box width={'100%'} height={'100%'} p={5}>
                    <Box height={'5%'} textAlign={'right'}>
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
                    <Box height={'5%'} marginBottom={10} display={'flex'} justifyContent={'space'}>
                        <DateRange
                            selectionRange={selectionRange}
                            setSelectionRange={setSelectionRange}
                        />
                        <Select placeholder="Цехи" width={'20%'} marginLeft={20}>
                            <option value="Лепешечный">Лепешечный</option>
                            <option value="Булочный">Булочный</option>
                            <option value="Заварной">Заварной</option>
                        </Select>
                    </Box>
                    <Box
                        backgroundColor={'rgba(255, 255, 255, 1)'}
                        width={'100%'}
                        height={'calc(90% - 2.5rem)'}
                        position={'relative'}
                    >
                        <TableContainer overflowY={'auto'}>
                            <Table
                                size="sm"
                                variant="unstyled"
                                overflow={'scroll'}
                                style={{ borderCollapse: 'separate', borderSpacing: '0 10px' }}
                            >
                                <Thead>
                                    <Tr width={'100%'}>
                                        <Th
                                            borderBottom={'1px solid black'}
                                            fontSize={'15px'}
                                            width={'15%'}
                                        >
                                            Вид хлеба
                                        </Th>
                                        <Th sx={styles} isNumeric width={'5%'}>
                                            Мука
                                        </Th>
                                        <Th sx={styles} isNumeric width={'5%'}>
                                            Соль
                                        </Th>
                                        <Th sx={styles} isNumeric width={'5%'}>
                                            Дрожжи
                                        </Th>
                                        <Th sx={styles} isNumeric width={'5%'}>
                                            Солод
                                        </Th>
                                        <Th sx={styles} isNumeric width={'5%'}>
                                            Масло
                                        </Th>
                                        <Th sx={styles} isNumeric width={'5%'}>
                                            t°
                                        </Th>
                                        <Th sx={styles} isNumeric width={'10%'}>
                                            Время
                                        </Th>
                                        <Th sx={styles} isNumeric width={'5%'}>
                                            Выход
                                        </Th>
                                        <Th sx={styles} isNumeric width={'10%'}>
                                            Действия
                                        </Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {bakingsData?.bakingData.map((bakingRow, index) => {
                                        return (
                                            <Tr key={index}>
                                                <Td>{bakingRow.product?.name}</Td>
                                                <Td>{bakingRow.flour}</Td>
                                                <Td>{bakingRow.salt}</Td>
                                                <Td>{bakingRow.yeast}</Td>
                                                <Td>{bakingRow.malt}</Td>
                                                <Td>{bakingRow.butter}</Td>
                                                <Td>{bakingRow.temperature}</Td>
                                                <Td>{bakingRow.time.toLocaleString()}</Td>
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
                            </Table>
                        </TableContainer>
                        <Box bottom={0} position={'absolute'} width={'100%'}>
                            <Table>
                                <Tfoot>
                                    <Tr width={'100%'}>
                                        <Td style={{ borderTop: '1px solid black' }} width={'15%'}>
                                            Итого
                                        </Td>
                                        <Td style={{ borderTop: '1px solid black' }} width={'5%'}>
                                            {bakingsData?.totals?.totalFlour}
                                        </Td>
                                        <Td style={{ borderTop: '1px solid black' }} width={'5%'}>
                                            {bakingsData?.totals?.totalSalt}
                                        </Td>
                                        <Td style={{ borderTop: '1px solid black' }} width={'5%'}>
                                            {bakingsData?.totals?.totalYeast}
                                        </Td>
                                        <Td style={{ borderTop: '1px solid black' }} width={'5%'}>
                                            {bakingsData?.totals?.totalMalt}
                                        </Td>
                                        <Td style={{ borderTop: '1px solid black' }} width={'5%'}>
                                            {bakingsData?.totals?.totalButter}
                                        </Td>
                                        <Td
                                            style={{ borderTop: '1px solid black' }}
                                            width={'5%'}
                                        ></Td>
                                        <Td
                                            style={{ borderTop: '1px solid black' }}
                                            width={'10%'}
                                        ></Td>
                                        <Td style={{ borderTop: '1px solid black' }} width={'5%'}>
                                            {bakingsData?.totals?.totalOutput}
                                        </Td>
                                        <Td
                                            style={{ borderTop: '1px solid black' }}
                                            width={'10%'}
                                        ></Td>
                                    </Tr>
                                </Tfoot>
                            </Table>
                        </Box>
                    </Box>
                </Box>
            </UniversalComponent>
        </>
    )
}

export default BakingPage
