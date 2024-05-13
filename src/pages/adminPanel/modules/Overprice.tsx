import {
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Box,
    useDisclosure,
    Button,
    Avatar,
    Select,
} from '@chakra-ui/react'
import OverPriceAddModal from '../components/OverPriceAddModal'
import { useState } from 'react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import Drawler from '@/components/Menu'
import { useNavigate } from 'react-router-dom'
import Dialog from '@/components/Dialog'
import { ADMIN_OVERPRICE_ROUTE } from '@/utils/constants/routes.consts'
import { useApi } from '@/utils/services/axios'
import { mutate } from 'swr'
import { deleteOverprice } from '@/utils/services/overprice.service'

interface Client {
    id: string
    name: string
    surname: string
    contact: string
    telegrammId: string
    status: string
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

    const { data: overPriceData } = useApi<OverPrice[]>('overPrice', {
        name: selectedClient,
    })

    const { data: clientData } = useApi<Client[]>('client')

    console.log(overPriceData)

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

            <Box display="flex" flexDirection="column" height="100vh" p={5}>
                <Box marginBottom={10} display={'flex'} justifyContent={'space-between'}>
                    <Box display={'flex'} gap={'15px'} width={'fit-content'}>
                        <Select
                            placeholder="Имя"
                            width={'fit-content'}
                            name="name"
                            onChange={handleSelectChange}
                        >
                            {clientData?.map((client, index) => (
                                <option key={index} value={client.name}>
                                    {client.name}
                                </option>
                            ))}
                        </Select>
                    </Box>

                    <Button colorScheme="purple" onClick={onOpen}>
                        Добавить
                    </Button>
                </Box>
                <TableContainer maxWidth={'100%'} width={'100%'}>
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
                                        <Td>{overData.id}</Td>
                                        <Td>{overData.client?.name}</Td>
                                        <Td>{overData.price}</Td>
                                        <Td>{overData.month}</Td>
                                        <Td>{overData.year}</Td>
                                        <Td>
                                            <EditIcon
                                                boxSize={'1.5em'}
                                                cursor={'pointer'}
                                                onClick={() => {
                                                    setSelectedData(overData)
                                                    onOpen()
                                                }}
                                            />
                                            <DeleteIcon
                                                boxSize={'1.5em'}
                                                color={'red'}
                                                cursor={'pointer'}
                                                onClick={() => {
                                                    setSelectedData(overData)
                                                    setDialog({
                                                        ...dialog,
                                                        isOpen: true,
                                                    })
                                                }}
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
