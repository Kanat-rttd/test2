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
import DateRange from '@/components/DateRange'
import { useApi } from '@/utils/services/axios'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { TableContainer, Tfoot, Thead } from '@/components/ui'
import Dialog from '@/components/Dialog'
import { useNotify } from '@/utils/providers/ToastProvider'
import { deleteBaking } from '@/utils/services/baking.service'
import { FacilityUnit } from '@/utils/types/product.types'
import { BakingDataType, BakingType } from '@/utils/types/baking.types'
import dayjs from 'dayjs'

const styles = {
    textAlign: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#000',
}

const BakingPage = () => {
    const { getURLs, getParam, setParam } = useURLParameters()
    const { loading } = useNotify()
    const { onOpen, onClose, isOpen } = useDisclosure()

    const { data: facilityUnits } = useApi<FacilityUnit[] | undefined>(`mixers`)
    const { data: bakingsData, mutate: mutateBakingData } = useApi<BakingType>(
        `baking?${getURLs().toString()}`,
    )

    const [selectedBaking, setSelectedBaking] = useState<BakingDataType | undefined>(undefined)
    const [dialog, setDialog] = useState({
        isOpen: false,
        onClose: () => setDialog({ ...dialog, isOpen: false }),
    })

    const handledSuccess = () => {
        mutateBakingData()
    }

    const handlerDelete = (selectedBaking: BakingDataType | undefined) => {
        if (selectedBaking) {
            const responsePromise: Promise<any> = deleteBaking(selectedBaking.id)
            loading(responsePromise)
            responsePromise.then(() => {
                mutateBakingData()
            })
        } else {
            console.error('No user data available to delete.')
        }
    }

    return (
        <>
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
                    <BakingAddModal
                        data={selectedBaking}
                        isOpen={isOpen}
                        onClose={onClose}
                        onSuccess={handledSuccess}
                    />
                </Box>
                <TableContainer style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Вид хлеба</Th>
                                <Th sx={styles}>Мука</Th>
                                <Th sx={styles}>Соль</Th>
                                <Th sx={styles}>Дрожжи</Th>
                                <Th sx={styles}>Солод</Th>
                                <Th sx={styles}>Масло</Th>
                                <Th sx={styles}>t°</Th>
                                <Th sx={styles}>Время и дата</Th>
                                <Th sx={styles}>Выход</Th>
                                <Th sx={styles}>Брак</Th>
                                <Th>Действия</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {bakingsData?.bakingData.length ? bakingsData?.bakingData.map((bakingRow, index) => {
                                return (
                                    <Tr key={index} textAlign={'center'}>
                                        <Td>{bakingRow.product?.name}</Td>
                                        {/* <Td textAlign={'center'}>{bakingRow.flour}</Td>
                                        <Td textAlign={'center'}>{bakingRow.salt}</Td>
                                        <Td textAlign={'center'}>{bakingRow.yeast}</Td>
                                        <Td textAlign={'center'}>{bakingRow.malt}</Td>
                                        <Td textAlign={'center'}>{bakingRow.butter}</Td> */}
                                        <Td textAlign={'center'}>{bakingRow.temperature}</Td>
                                        <Td textAlign={'center'}>
                                            {dayjs(bakingRow.dateTime).format('HH:mm DD.MM.YYYY')}
                                        </Td>
                                        <Td textAlign={'center'}>{bakingRow.output}</Td>
                                        <Td textAlign={'center'}>{bakingRow.defective}</Td>
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
                            }) : <Tr><Td>Нет данных</Td></Tr>}
                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Th fontSize={16} fontWeight={'bold'} color={'#000'}>
                                    Итого
                                </Th>
                                <Th sx={styles}>{bakingsData?.totals?.totalFlour || 0}</Th>
                                <Th sx={styles}>{bakingsData?.totals?.totalSalt || 0}</Th>
                                <Th sx={styles}>{bakingsData?.totals?.totalYeast || 0}</Th>
                                <Th sx={styles}>{bakingsData?.totals?.totalMalt || 0}</Th>
                                <Th sx={styles}>{bakingsData?.totals?.totalButter || 0}</Th>
                                <Th sx={styles}></Th>
                                <Th sx={styles}></Th>
                                <Th sx={styles}>{bakingsData?.totals?.totalOutput || 0}</Th>
                                <Th sx={styles}>{bakingsData?.totals?.totalDefective || 0}</Th>
                                <Th sx={styles}></Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </Box>
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
