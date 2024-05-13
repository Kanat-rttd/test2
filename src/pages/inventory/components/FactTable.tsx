import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableContainer,
    Box,
    IconButton,
} from '@chakra-ui/react'
import { useApi } from '@/utils/services/axios'
import { mutate } from '@/utils/services/axios'
import dayjs from 'dayjs'
import { useState } from 'react'
import EditModal from './EditModal'
import { useDisclosure } from '@chakra-ui/react'
import Dialog from '@/components/Dialog'
import { deleteFactInput } from '@/utils/services/factInput.service'

interface factInput {
    table: [
        {
            id: number
            name: string
            place: string
            unitOfMeasure: string
            quantity: number
            updatedAt: string
        },
    ]
    totalFact: number
}

const FactTable = () => {
    const { data: factInput } = useApi<factInput>('factInput')
    console.log(factInput)

    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleUpdateProduct = () => {
        console.log('mutate')
    }

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

    const deleteFactHandler = (
        data:
            | {
                  id: number
                  name: string
                  place: string
                  unitOfMeasure: string
                  quantity: number
                  updatedAt: string
              }
            | undefined,
    ) => {
        console.log(data)
        deleteFactInput(data?.id).then((res) => {
            console.log(res)
            mutate('factInput')
        })
    }

    return (
        <>
            <TableContainer overflowY={'auto'} height={'90%'}>
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
                        {factInput?.table.map((item, index) => (
                            <Tr key={item.id}>
                                <Td>{index + 1}</Td>
                                <Td>{item.name}</Td>
                                <Td>{item.unitOfMeasure}</Td>
                                <Td>{item.quantity}</Td>
                                <Td>{dayjs(item.updatedAt).format('DD.MM.YYYY HH:MM')}</Td>
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
                </Table>
            </TableContainer>
            <Box bottom={0} position={'absolute'} width={'100%'}>
                <Table>
                    <Tfoot>
                        <Tr>
                            <Th fontSize={15} color={'#000'}>
                                ИТОГО
                            </Th>
                            <Th></Th>
                            <Th></Th>
                            <Th fontSize={15} color={'#000'}>
                                {factInput?.totalFact}
                            </Th>
                            <Th></Th>
                            <Th></Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </Box>
            <EditModal
                selectedData={selectedData}
                isOpen={isOpen}
                onClose={onClose}
                onSuccess={handleUpdateProduct}
            />
            <Dialog
                isOpen={dialog.isOpen}
                onClose={dialog.onClose}
                header="Удалить"
                body="Вы уверены? Вы не сможете отменить это действие впоследствии."
                actionBtn={() => {
                    deleteFactHandler(selectedData)
                    dialog.onClose()
                }}
                actionText="Удалить"
            />
        </>
    )
}

export default FactTable
