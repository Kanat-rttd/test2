import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Table, Tbody, Tr, Th, Td,  IconButton } from '@chakra-ui/react'
import { useApi } from '@/utils/services/axios'
import dayjs from 'dayjs'
import { useState } from 'react'
import EditModal from './EditModal'
import { useDisclosure } from '@chakra-ui/react'
import Dialog from '@/components/Dialog'
import { deleteFactInput } from '@/utils/services/factInput.service'
import { TableContainer, Tfoot, Thead } from '@/components/ui'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { useNotify } from '@/utils/providers/ToastProvider'
import { FactInputType } from '@/utils/types/factInput.types'

const FactTable = () => {
    const { loading } = useNotify()
    const { getURLs } = useURLParameters()
    const { data: factInputData, mutate: mutateFactInput } = useApi<FactInputType>(
        `factInput?${getURLs().toString()}`,
    )

    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleSelected = (data: {
        id: number
        name: string
        place: string
        unitOfMeasure: string
        quantity: number
        updatedAt: string
    }) => {
        setSelectedData(data)
        onOpen()
    }

    const [dialog, setDialog] = useState({
        isOpen: false,
        onClose: () => setDialog({ ...dialog, isOpen: false }),
    })

    const [selectedData, setSelectedData] = useState<
        | {
              id: number
              name: string
              place: string
              unitOfMeasure: string
              quantity: number
              updatedAt: string
          }
        | undefined
    >(undefined)

    const deleteFactHandler = () => {
        if (selectedData) {
            const responsePromise: Promise<any> = deleteFactInput(selectedData.id)
            loading(responsePromise)
            responsePromise.then(() => {
                successHandler()
            })
        } else {
            console.error('No user data available to delete.')
        }
    }

    const successHandler = () => {
        console.log('success')
        mutateFactInput()
    }

    return (
        <>
            <TableContainer style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
                <Table variant="simple" width={'100%'}>
                    <Thead>
                        <Tr position={'sticky'} top={0} backgroundColor={'white'}>
                            <Th width={'10%'}>№</Th>
                            <Th width={'30%'}>Товары</Th>
                            <Th width={'20%'}>Единица измерения</Th>
                            <Th width={'20%'}>Количество фактическое</Th>
                            <Th width={'20%'}>Время изменения</Th>
                            <Th width={'10%'}>Действия</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {factInputData?.table.map((item, index) => (
                            <Tr key={item.id}>
                                <Td>{index + 1}</Td>
                                <Td>{item.name}</Td>
                                <Td>{item.unitOfMeasure}</Td>
                                <Td>{item.quantity}</Td>
                                <Td>{dayjs(item.updatedAt).format('DD.MM.YYYY HH:mm')}</Td>
                                <Td>
                                    <IconButton
                                        variant="outline"
                                        size={'sm'}
                                        colorScheme="teal"
                                        aria-label="Send email"
                                        marginRight={3}
                                        onClick={() => {
                                            handleSelected(item)
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
                                            setSelectedData(item)
                                            setDialog({
                                                ...dialog,
                                                isOpen: true,
                                            })
                                        }}
                                        icon={<DeleteIcon />}
                                    />
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th fontSize={15} color={'#000'}>
                                ИТОГО
                            </Th>
                            <Th w={'15%'}></Th>
                            <Th w={'51%'}></Th>
                            <Th fontSize={15} color={'#000'}>
                                {factInputData?.totalFact}
                            </Th>
                            <Th></Th>
                            <Th></Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>

            <EditModal
                selectedData={selectedData}
                isOpen={isOpen}
                onClose={onClose}
                onSuccess={successHandler}
            />
            <Dialog
                isOpen={dialog.isOpen}
                onClose={dialog.onClose}
                header="Удалить"
                body="Вы уверены? Вы не сможете отменить это действие впоследствии."
                actionBtn={() => {
                    deleteFactHandler()
                    dialog.onClose()
                }}
                actionText="Удалить"
            />
        </>
    )
}

export default FactTable
