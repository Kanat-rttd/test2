import { useState } from 'react'
import {
    Box,
    Table,
    Tr,
    Th,
    Tbody,
    Td,
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
import { mutate, useApi } from '@/utils/services/axios'
import Header from '@/components/Header'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { TableContainer, Tfoot, Thead } from '@/components/ui'
import Dialog from '@/components/Dialog'
import { useNotify } from '@/utils/providers/ToastProvider'
import { deleteBaking } from '@/utils/services/baking.service'

interface Baking {
    bakingData: bakingsData[]
    totals: BakingTotals
}

interface bakingsData {
    id: number
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
    textAlign: 'center',
}

const BakingPage = () => {
    const { loading } = useNotify()
    const { getURLs } = useURLParameters()
    const { onOpen, onClose, isOpen } = useDisclosure()
    const navigate = useNavigate()
    const [selectedBaking, setSelectedBaking] = useState<bakingsData | undefined>(undefined)
    const [dialog, setDialog] = useState({
        isOpen: false,
        onClose: () => setDialog({ ...dialog, isOpen: false }),
    })

    const { data: bakingsData } = useApi<Baking>(`baking?${getURLs().toString()}`)

    const handlerDelete = (selectedBaking: bakingsData | undefined) => {
        if (selectedBaking) {
            const responsePromise: Promise<any> = deleteBaking(selectedBaking.id)
            loading(responsePromise)
            responsePromise.then(() => {
                mutate((currentData: bakingsData[] | undefined) => {
                    if (!currentData) return currentData
                    return currentData.filter((item) => item.id !== selectedBaking?.id)
                })
            })
        } else {
            console.error('No user data available to delete.')
        }
    }

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

                <Box p={5}>
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <Box marginBottom={7} display={'flex'}>
                            <DateRange />
                            <Select
                                placeholder="Цехи"
                                width={'100%'}
                                marginLeft={5}
                                size={'sm'}
                                borderRadius={5}
                            >
                                <option value="Лепешечный">Лепешечный</option>
                                <option value="Булочный">Булочный</option>
                                <option value="Заварной">Заварной</option>
                            </Select>
                        </Box>
                        <Button
                            size={'md'}
                            backgroundColor={'#6B6FDB'}
                            color={'white'}
                            fontSize={'px'}
                            borderRadius={'10px'}
                            width={'15%'}
                            onClick={() => {
                                setSelectedBaking(undefined)
                                onOpen()
                            }}
                        >
                            Добавить
                        </Button>
                        <BakingAddModal data={selectedBaking} isOpen={isOpen} onClose={onClose} />
                    </Box>

                    <Box>
                        <TableContainer
                            style={{ width: '100%', height: '100%', overflowY: 'auto' }}
                        >
                            <Table variant="simple">
                                <Thead>
                                    <Tr width={'100%'}>
                                        <Th width={'15%'}>
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
                                        <Th sx={styles} isNumeric width={'5%'}>
                                            Время
                                        </Th>
                                        <Th sx={styles} isNumeric width={'5%'}>
                                            Выход
                                        </Th>
                                        <Th isNumeric width={'5%'}>
                                            Действия
                                        </Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {bakingsData?.bakingData.map((bakingRow, index) => {
                                        return (
                                            <Tr key={index}>
                                                <Td >{bakingRow.product?.name}</Td>
                                                <Td sx={styles} >{bakingRow.flour}</Td>
                                                <Td sx={styles} >{bakingRow.salt}</Td>
                                                <Td sx={styles} >{bakingRow.yeast}</Td>
                                                <Td sx={styles} >{bakingRow.malt}</Td>
                                                <Td sx={styles} >{bakingRow.butter}</Td>
                                                <Td sx={styles} >{bakingRow.temperature}</Td>
                                                <Td sx={styles} >{bakingRow.time.toLocaleString()}</Td>
                                                <Td sx={styles} >{bakingRow.output}</Td>
                                                <Td >
                                                    <IconButton
                                                        variant="outline"
                                                        size={'sm'}
                                                        colorScheme="teal"
                                                        aria-label="Send email"
                                                        marginRight={3}
                                                        onClick={() => {
                                                            setSelectedBaking(bakingRow)
                                                            onOpen()
                                                        }}
                                                        icon={<EditIcon />}
                                                    />
                                                    <IconButton
                                                        variant="outline"
                                                        size={'sm'}
                                                        colorScheme="teal"
                                                        aria-label="Send email"
                                                        marginRight={3}
                                                        onClick={() => {
                                                            setSelectedBaking(bakingRow)
                                                            setDialog({
                                                                ...dialog,
                                                                isOpen: true,
                                                            })
                                                        }}
                                                        icon={<DeleteIcon />}
                                                    />
                                                </Td>
                                            </Tr>
                                        )
                                    })}
                                </Tbody>
                                <Tfoot>
                                    <Tr fontSize={15} color={'#000'} width={'100%'}>
                                        <Td fontSize={15} color={'#000'} width={'15%'}>Итого</Td>
                                        <Td fontSize={15} color={'#000'} width={'5%'}>{bakingsData?.totals?.totalFlour}</Td>
                                        <Td fontSize={15} color={'#000'} width={'5%'}>{bakingsData?.totals?.totalSalt}</Td>
                                        <Td fontSize={15} color={'#000'} width={'5%'}>{bakingsData?.totals?.totalYeast}</Td>
                                        <Td fontSize={15} color={'#000'} width={'5%'}>{bakingsData?.totals?.totalMalt}</Td>
                                        <Td fontSize={15} color={'#000'} width={'5%'}>{bakingsData?.totals?.totalButter}</Td>
                                        <Td fontSize={15} color={'#000'} width={'5%'}></Td>
                                        <Td fontSize={15} color={'#000'} width={'10%'}></Td>
                                        <Td fontSize={15} color={'#000'} width={'5%'}>{bakingsData?.totals?.totalOutput}</Td>
                                        <Td fontSize={15} color={'#000'} width={'10%'}></Td>
                                    </Tr>
                                </Tfoot>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </UniversalComponent>
            <Dialog
                isOpen={dialog.isOpen}
                onClose={dialog.onClose}
                header="Удалить"
                body="Вы уверены? Вы не сможете отменить это действие впоследствии."
                actionBtn={() => {
                    dialog.onClose()
                    handlerDelete(selectedBaking)
                }}
                actionText="Удалить"
            />
        </>
    )
}

export default BakingPage
