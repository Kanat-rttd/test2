import Dialog from '@/components/Dialog'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
    Box,
    Button,
    IconButton,
    Select,
    Table,
    Tbody,
    Td,
    Th,
    Tr,
    useDisclosure,
} from '@chakra-ui/react'
import EditModal from './EditModal'
import { useState } from 'react'
import dayjs from 'dayjs'
import { useApi } from '@/utils/services/axios'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { TableContainer, Thead } from '@/components/ui'
import { useNotify } from '@/utils/providers/ToastProvider'
import { deleteDispatch } from '@/utils/services/dispatch.service'
import { DispatchType } from '@/utils/types/dispatch.types'
import DateRange from '@/components/DateRange'

export interface ListTableProps {
    status: string
}

export interface FacilityUnit {
    id: number
    facilityUnit: string
}

export type Dispatch = {
    data: DispatchType[]
    totalPrice: number
    totalQuantity: number
}

export default function ListTable({ status }: ListTableProps) {
    const { loading } = useNotify()
    const { getURLs, setParam, getParam } = useURLParameters()
    const { data: facilityUnitsData } = useApi<FacilityUnit[]>('mixers')
    const { onOpen } = useDisclosure()

    const [selectedData, setSelectedData] = useState<DispatchType>()

    const [dialog, setDialog] = useState({
        isOpen: false,
        onClose: () => setDialog({ ...dialog, isOpen: false }),
    })

    const { data: dispatchesData, mutate: mutateDispatchesData } = useApi<Dispatch>(
        `release?${getURLs().toString()}&status=${status}`,
    )

    const [modal, setModal] = useState({
        isOpen: false,
        onClose: () => setModal({ ...modal, isOpen: false }),
    })

    const handleClientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setParam('facilityUnit', event.target.value)
    }

    const handlerDelete = (selectedData: DispatchType | undefined) => {
        if (selectedData) {
            const responsePromise: Promise<any> = deleteDispatch(selectedData.id)
            loading(responsePromise)
            responsePromise.then(() => {
                mutateDispatchesData()
            })
        } else {
            console.error('No data available to delete.')
        }
    }

    const onSuccess = () => {
        mutateDispatchesData()
        setSelectedData(undefined)
    }

    return (
        <>
            <Box
                mt={2}
                marginBottom={'20px'}
                height={'5%'}
                display={'flex'}
                justifyContent={'space-between'}
            >
                <Box display={'flex'} gap={'15px'} width={'100%'}>
                    <DateRange />
                    <Select
                        size={'sm'}
                        borderRadius={5}
                        placeholder="Цех"
                        width={'fit-content'}
                        value={getParam('facilityUnit')}
                        onChange={handleClientChange}
                    >
                        {facilityUnitsData?.map((unit, index) => (
                            <option key={index} value={unit.id}>
                                {unit.facilityUnit}
                            </option>
                        ))}
                    </Select>
                </Box>

                <Button colorScheme="purple" onClick={onOpen} height={'32px'} p={'0 25px'}>
                    Выдача продукции
                </Button>
            </Box>
            <TableContainer style={{ minHeight: '70dvh', maxHeight: '70dvh', overflowY: 'auto' }}>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>№</Th>
                            <Th>Реализатор</Th>
                            <Th>Виды хлеба</Th>
                            <Th>Количество </Th>
                            <Th>Дата и время</Th>
                            <Th>Действия</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {dispatchesData?.data
                            .sort((a, b) => a.id - b.id)
                            .map((row, index) => {
                                return (
                                    <Tr key={row.id}>
                                        <Td>{index + 1}</Td>
                                        <Td>{row.client.name}</Td>
                                        <Td>
                                            <div
                                                style={{ display: 'flex', flexDirection: 'column' }}
                                            >
                                                {row.goodsDispatchDetails.map((details) => (
                                                    <span key={details.id}>
                                                        {details.product?.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </Td>
                                        <Td>
                                            <div
                                                style={{ display: 'flex', flexDirection: 'column' }}
                                            >
                                                {row.goodsDispatchDetails.map((details, index) => (
                                                    <span key={index}>{details.quantity}</span>
                                                ))}
                                            </div>
                                        </Td>
                                        <Td>{dayjs(row.createdAt).format('HH:mm DD.MM.YYYY')}</Td>
                                        <Td>
                                            <IconButton
                                                variant="outline"
                                                size={'sm'}
                                                colorScheme="teal"
                                                aria-label="Send email"
                                                marginRight={3}
                                                onClick={() => {
                                                    setSelectedData(row)
                                                    setModal({ ...modal, isOpen: true })
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
                                                    setSelectedData(row)
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
            </TableContainer>
            <EditModal
                data={selectedData}
                isOpen={modal.isOpen}
                onClose={modal.onClose}
                onSuccess={onSuccess}
            />
            <Dialog
                isOpen={dialog.isOpen}
                onClose={dialog.onClose}
                header="Удалить"
                body="Вы уверены? Вы не сможете отменить это действие впоследствии."
                actionBtn={() => {
                    dialog.onClose()
                    handlerDelete(selectedData)
                }}
                actionText="Удалить"
            />
        </>
    )
}
