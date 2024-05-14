import Drawler from '@/components/Menu'
import { ADMIN_RELEASE_ROUTE, ADMIN_UNIQUEPRICE_ROUTE } from '@/utils/constants/routes.consts'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
    Avatar,
    Box,
    Button,
    IconButton,
    Select,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import ReleaseAddModal, { Releaser } from '../components/ReleaseAddModal'
import { useState, useEffect } from 'react'
import { deleteClient, getAllClients } from '@/utils/services/client.service'
import useSWR, { mutate } from 'swr'
import { useApi } from '@/utils/services/axios'
import Dialog from '@/components/Dialog'
import { useNotify } from '@/utils/providers/ToastProvider'

const AdminPanel = () => {
    const { loading } = useNotify()
    const navigate = useNavigate()
    const { onOpen, onClose, isOpen } = useDisclosure()
    const [selectedData, setSelectedData] = useState<Releaser | undefined>(undefined)
    const [filters, setFilters] = useState({ name: '', telegrammId: '', status: '' })
    const { data: clientsData } = useApi<Releaser[]>('client', filters)
    const { data: filtersData } = useSWR<Releaser[]>('clientFilter', {
        fetcher: () => getAllClients({ name: '', telegrammId: '', status: '' }),
    })

    const [dialog, setDialog] = useState({
        isOpen: false,
        onClose: () => setDialog({ ...dialog, isOpen: false }),
    })

    console.log(filters.name)

    useEffect(() => {
        mutate(['client', filters])
    }, [filters])

    const onCloseModal = () => {
        setSelectedData(undefined)
        onClose()
    }

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }))
    }

    console.log(filters)

    const handledSuccess = () => {
        mutate(['client', filters])
    }

    const deleteUser = (selectedData: Releaser | undefined) => {
        if (selectedData) {
            const responsePromise: Promise<any> = deleteClient(selectedData.id)
            loading(responsePromise)
            responsePromise.then(() => {
                mutate((currentData: Releaser[] | undefined) => {
                    if (!currentData) return currentData
                    return currentData.filter((client) => client.id !== selectedData?.id)
                })
            })
        } else {
            console.error('No releaser data available to delete.')
        }
    }

    return (
        <>
            <Box>
                <Box
                    display="flex"
                    justifyContent={'space-between'}
                    flexDirection={'row'}
                    backgroundColor={'rgba(128, 128, 128, 0.1)'}
                    p={'0rem 0.5rem'}
                >
                    <Box width={'100%'}>
                        <Drawler></Drawler>
                        <Button
                            height={'100%'}
                            onClick={() => navigate(ADMIN_RELEASE_ROUTE)}
                            bg={'rgba(217, 217, 217, 1)'}
                        >
                            Реализаторы
                        </Button>
                        <Button height={'100%'} onClick={() => navigate(ADMIN_UNIQUEPRICE_ROUTE)}>
                            Уникальные цены
                        </Button>
                    </Box>
                    <Avatar w={'36px'} h={'36px'} bg="teal.500" m={'0.5rem 0.5rem'} />
                </Box>

                <Box width={'100%'} height={'100%'} p={5}>
                    <Box marginBottom={10} display={'flex'} justifyContent={'space-between'}>
                        <Box display={'flex'} gap={'15px'} width={'fit-content'}>
                            <Select
                                name="name"
                                placeholder="Имя"
                                width={'fit-content'}
                                onChange={handleSelectChange}
                            >
                                {filtersData?.map((client, index) => (
                                    <option key={index} value={client.name}>
                                        {client.name}
                                    </option>
                                ))}
                            </Select>
                            <Select
                                name="telegrammId"
                                placeholder="Телеграм ID"
                                width={'fit-content'}
                                onChange={handleSelectChange}
                            >
                                {filtersData?.map((client, index) => (
                                    <option key={index} value={client.telegrammId}>
                                        {client.telegrammId}
                                    </option>
                                ))}
                            </Select>
                            <Select
                                name="status"
                                placeholder="Статус"
                                width={'fit-content'}
                                onChange={handleSelectChange}
                            >
                                <option value="Активный">Активный</option>
                                <option value="Неактивный">Неактивный</option>
                            </Select>
                        </Box>

                        <Button colorScheme="purple" onClick={onOpen}>
                            Добавить
                        </Button>
                    </Box>
                    <Box>
                        <TableContainer>
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th>№</Th>
                                        <Th>Имя</Th>
                                        <Th>Фамилия</Th>
                                        <Th>Контакты</Th>
                                        <Th>Телеграм ID</Th>
                                        <Th>Статус</Th>
                                        <Th>Действия</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {clientsData?.map((user, index) => {
                                        const ordinalNumber: number = index + 1
                                        return (
                                            <Tr key={index}>
                                                <Td>{ordinalNumber}</Td>
                                                <Td>{user.name}</Td>
                                                <Td>{user.surname}</Td>
                                                <Td>+7{user.contact}</Td>
                                                <Td>{user.telegrammId}</Td>
                                                <Td>{user.status}</Td>
                                                <Td sx={{ width: '5%' }}>
                                                    <IconButton
                                                        variant="outline"
                                                        size={'sm'}
                                                        colorScheme="teal"
                                                        aria-label="Send email"
                                                        marginRight={3}
                                                        onClick={() => {
                                                            setSelectedData(user)
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
                                                            setSelectedData(user)
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
                    </Box>
                </Box>
            </Box>
            <ReleaseAddModal
                onClose={onCloseModal}
                isOpen={isOpen}
                data={selectedData}
                onSuccess={handledSuccess}
            />
            <Dialog
                isOpen={dialog.isOpen}
                onClose={dialog.onClose}
                header="Удалить"
                body="Вы уверены? Вы не сможете отменить это действие впоследствии."
                actionBtn={() => {
                    dialog.onClose()
                    deleteUser(selectedData)
                }}
                actionText="Удалить"
            />
        </>
    )
}

export default AdminPanel
