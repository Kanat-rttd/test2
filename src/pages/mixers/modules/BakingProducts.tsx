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
import BakingAddModal from '../components/BakingAddModal'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import UniversalComponent from '@/components/ui/UniversalComponent'
import DateRange from '@/components/DateRange'
import { mutate, useApi } from '@/utils/services/axios'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { TableContainer, Tfoot, Thead } from '@/components/ui'
import Dialog from '@/components/Dialog'
import { useNotify } from '@/utils/providers/ToastProvider'
import { deleteBaking } from '@/utils/services/baking.service'
import { FacilityUnit } from '@/utils/types/product.types'

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
    const { getURLs, getParam, setParam } = useURLParameters()
    const { loading } = useNotify()
    const { onOpen, onClose, isOpen } = useDisclosure()

    const { data: facilityUnits } = useApi<FacilityUnit[] | undefined>(`mixers`)
    const { data: bakingsData, mutate: mutateBakingData } = useApi<Baking>(`baking?${getURLs().toString()}`)

    const [selectedBaking, setSelectedBaking] = useState<bakingsData | undefined>(undefined)
    const [dialog, setDialog] = useState({
        isOpen: false,
        onClose: () => setDialog({ ...dialog, isOpen: false }),
    })

    const handledSuccess = () => {
        mutateBakingData()
    }

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
                <Box p={5} mt={1}>
                    <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>
                        <Box marginBottom={7} display={'flex'} gap={15} width={'100%'}>
                            <DateRange />
                            <Select
                                placeholder="Цех"
                                width={'17%'}
                                size={'sm'}
                                borderRadius={5}
                                justifyContent={'space-between'}
                                defaultValue={getParam('facilityUnit')}
                                onChange={(e) => setParam('facilityUnit', e.target.value)}
                            >
                                {facilityUnits?.map((item, index) => (
                                    <option key={index} value={item.id}>
                                        {item.facilityUnit}
                                    </option>
                                ))}
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
                        <BakingAddModal data={selectedBaking} isOpen={isOpen} onClose={onClose} onSuccess={handledSuccess} />
                    </Box>
                    <TableContainer style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
                        <Box pb={4}>
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th width={'15%'}>Вид хлеба</Th>
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
                                                <Td>{bakingRow.product?.name}</Td>
                                                <Td sx={styles}>{bakingRow.flour}</Td>
                                                <Td sx={styles}>{bakingRow.salt}</Td>
                                                <Td sx={styles}>{bakingRow.yeast}</Td>
                                                <Td sx={styles}>{bakingRow.malt}</Td>
                                                <Td sx={styles}>{bakingRow.butter}</Td>
                                                <Td sx={styles}>{bakingRow.temperature}</Td>
                                                <Td sx={styles}>
                                                    {bakingRow.time.toLocaleString()}
                                                </Td>
                                                <Td sx={styles}>{bakingRow.output}</Td>
                                                <Td>
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
                            </Table>
                        </Box>
                        <Table variant="simple">
                            <Tfoot>
                                <Tr fontSize={15} fontWeight={'bold'} color={'#000'}>
                                    <Td width={'15%'}>Итого</Td>
                                    <Td width={'7%'}>{bakingsData?.totals?.totalFlour}</Td>
                                    <Td width={'7%'}>{bakingsData?.totals?.totalSalt}</Td>
                                    <Td width={'7%'}>{bakingsData?.totals?.totalYeast}</Td>
                                    <Td width={'7%'}>{bakingsData?.totals?.totalMalt}</Td>
                                    <Td width={'5%'}>{bakingsData?.totals?.totalButter}</Td>
                                    <Td width={'5%'}></Td>
                                    <Td width={'10%'}></Td>
                                    <Td width={'3%'}>{bakingsData?.totals?.totalOutput}</Td>
                                    <Td width={'10%'}></Td>
                                </Tr>
                            </Tfoot>
                        </Table>
                    </TableContainer>
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
