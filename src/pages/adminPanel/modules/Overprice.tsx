import {
    Table,
    Tr,
    Th,
    Tbody,
    Td,
    Box,
    useDisclosure,
    Button,
    Select,
    IconButton,
} from '@chakra-ui/react'
import OverPriceAddModal from '../components/OverPriceAddModal'
import { useState } from 'react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import Dialog from '@/components/Dialog'
import { useApi } from '@/utils/services/axios'
import { deleteOverprice } from '@/utils/services/overprice.service'
import DateRange from '@/components/DateRange'
import { TableContainer, Thead } from '@/components/ui'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import UniversalComponent from '@/components/ui/UniversalComponent'
import { OverPriceType } from '@/utils/types/overPrice.types'
import { ClientsFilter } from '@/utils/types/client.type'

const AdminPanel = () => {
    const { getURLs, setParam } = useURLParameters()

    const { data: overPriceData, isLoading, mutate: mutateOverPriceData } = useApi<OverPriceType[]>(
        `overPrice?${getURLs().toString()}`,
    )

    const { data: clientData } = useApi<ClientsFilter[]>('overPrice/clientFilter')

    const { onOpen, isOpen, onClose } = useDisclosure()
    const [selectedData, setSelectedData] = useState<OverPriceType>()
    const [dialog, setDialog] = useState({
        isOpen: false,
        onClose: () => setDialog({ ...dialog, isOpen: false }),
    })

    const handleSuccess = () => {
        mutateOverPriceData()
    }

    const delOverprice = (selectedData: OverPriceType | undefined) => {
        if (selectedData) {
            deleteOverprice(selectedData.id).then(() => {
                handleSuccess()
            })
        } else {
            console.error('No product data available to delete.')
        }
    }

    const handleClose = () => {
        setSelectedData(undefined)
        onClose()
    }

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target
        console.log(name, value)
        setParam('name', value)
    }

    return (
        <>
            <UniversalComponent>
                <Box display="flex" flexDirection="column" p={5}>
                    <Box marginBottom={6} display={'flex'} justifyContent={'space-between'}>
                        <Box display={'flex'} gap={'15px'} width={'fit-content'} mt={2}>
                            <Select
                                size={'sm'}
                                borderRadius={5}
                                placeholder="Имя"
                                width={'100%'}
                                name="name"
                                onChange={handleSelectChange}
                            >
                                {clientData?.map((client, index) => (
                                    <option key={index} value={client.client.name}>
                                        {client.client.name}
                                    </option>
                                ))}
                            </Select>

                            <DateRange />
                        </Box>

                        <Button colorScheme="purple" onClick={onOpen}>
                            Добавить
                        </Button>
                    </Box>
                    <TableContainer
                        isLoading={isLoading}
                        style={{ width: '100%', height: '100%', overflowY: 'auto' }}
                    >
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>№</Th>
                                    <Th>Реализатор</Th>
                                    <Th>Сверху</Th>
                                    <Th>Месяц</Th>
                                    <Th>Год</Th>
                                    <Th>Действия</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {overPriceData?.map((overData, index) => {
                                    return (
                                        <Tr key={index}>
                                            <Td>{index + 1}</Td>
                                            <Td>{overData.client?.name}</Td>
                                            <Td>{overData.price}</Td>
                                            <Td>{overData.month}</Td>
                                            <Td>{overData.year}</Td>
                                            <Td>
                                                <IconButton
                                                    variant="outline"
                                                    size={'sm'}
                                                    colorScheme="teal"
                                                    aria-label="Send email"
                                                    marginRight={3}
                                                    onClick={() => {
                                                        setSelectedData(overData)
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
                                                        setSelectedData(overData)
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
                    <OverPriceAddModal
                        data={selectedData}
                        isOpen={isOpen}
                        onClose={handleClose}
                        onSuccess={handleSuccess}
                    />
                    <Dialog
                        isOpen={dialog.isOpen}
                        onClose={dialog.onClose}
                        header="Удалить"
                        body="Вы уверены? Вы не сможете отменить это действие впоследствии."
                        actionBtn={() => {
                            dialog.onClose()
                            delOverprice(selectedData)
                        }}
                        actionText="Удалить"
                    />
                </Box>
            </UniversalComponent>
        </>
    )
}

export default AdminPanel
