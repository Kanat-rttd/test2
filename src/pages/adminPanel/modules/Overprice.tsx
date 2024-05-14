import {
    Table,
    Tr,
    Th,
    Tbody,
    Td,
    Box,
    useDisclosure,
    Button,
    Avatar,
    Select,
    IconButton,
} from '@chakra-ui/react'
import OverPriceAddModal from '../components/OverPriceAddModal'
import { useState, useEffect } from 'react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import Drawler from '@/components/Menu'
import { useNavigate } from 'react-router-dom'
import Dialog from '@/components/Dialog'
import { ADMIN_OVERPRICE_ROUTE } from '@/utils/constants/routes.consts'
import { useApi } from '@/utils/services/axios'
import { mutate } from 'swr'
import { deleteOverprice } from '@/utils/services/overprice.service'
import DateRange from '@/components/DateRange'
import { TableContainer, Thead } from '@/components/ui'

interface ClientsFilter {
    clientId: number
    client: {
        id: number
        name: string
    }
}

interface OverPrice {
    id: number
    price: string
    clientId: number
    month: string
    year: string
    isDeleted: number
    client: {
        id: number
        name: string
    }
}

const AdminPanel = () => {
    // const { data: overPriceData } = useApi<OverPrice[]>('overPrice')
    const [selectedClient, setSelectedClient] = useState('')

    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
    })

    useEffect(() => {
        console.log(selectionRange.startDate)
        console.log(selectionRange.endDate)
    }, [selectionRange])

    const { data: overPriceData, isLoading } = useApi<OverPrice[]>('overPrice', {
        name: selectedClient,
        startDate: String(selectionRange.startDate),
        endDate: String(selectionRange.endDate),
    })

    // const { data: clientData } = useApi<Client[]>('client')

    const { data: clientData } = useApi<ClientsFilter[]>('overPrice/clientFilter')

    console.log(clientData)

    const navigate = useNavigate()
    const { onOpen, isOpen, onClose } = useDisclosure()
    const [selectedData, setSelectedData] = useState<OverPrice>()
    const [dialog, setDialog] = useState({
        isOpen: false,
        onClose: () => setDialog({ ...dialog, isOpen: false }),
    })

    const handleSuccess = () => {
        mutate(`overPrice?name=${selectedClient}`)
    }

    const delOverprice = (selectedData: OverPrice | undefined) => {
        if (selectedData) {
            deleteOverprice(selectedData.id).then((res) => {
                console.log(res)
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
        setSelectedClient(value)
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
                    <Button
                        height={'100%'}
                        onClick={() => navigate(ADMIN_OVERPRICE_ROUTE)}
                        bg={'rgba(217, 217, 217, 1)'}
                    >
                        Сверху
                    </Button>
                </Box>
                <Avatar bg="teal.500" />
            </Box>

            <Box display="flex" flexDirection="column" p={5}>
                <Box marginBottom={5} display={'flex'} justifyContent={'space-between'}>
                    <Box display={'flex'} gap={'15px'} width={'fit-content'}>
                        <Select
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

                        <DateRange
                            selectionRange={selectionRange}
                            setSelectionRange={setSelectionRange}
                        />
                    </Box>

                    <Button colorScheme="purple" onClick={onOpen}>
                        Добавить
                    </Button>
                </Box>
                <TableContainer maxWidth={'100%'} width={'100%'} isLoading={isLoading}>
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
        </>
    )
}

export default AdminPanel
