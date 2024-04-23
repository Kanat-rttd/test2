import Drawler from '@/components/Drawler'
import { ADMIN_RELEASE_ROUTE, ADMIN_UNIQUEPRICE_ROUTE } from '@/utils/constants/routes.consts'
import { EditIcon } from '@chakra-ui/icons'
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
import { getAllClients } from '@/utils/services/client.service'
import useSWR, { mutate } from 'swr'
import { useApi } from '@/utils/services/axios'

const AdminPanel = () => {
    const navigate = useNavigate()
    const { onOpen, onClose, isOpen } = useDisclosure()
    const [selectedData, setSelectedData] = useState<Releaser | undefined>(undefined)

    const [filters, setFilters] = useState({ name: '', telegrammId: '', status: '' })

    const { data: clientsData } = useApi<Releaser[]>('client', filters)

    const { data: filtersData } = useSWR<Releaser[]>('clientFilter', {
        fetcher: () => getAllClients({ name: '', telegrammId: '', status: '' }),
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

    return (
        <>
            <Box>
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
                            onClick={() => navigate(ADMIN_RELEASE_ROUTE)}
                            bg={'rgba(217, 217, 217, 1)'}
                        >
                            Реализаторы
                        </Button>
                        <Button height={'100%'} onClick={() => navigate(ADMIN_UNIQUEPRICE_ROUTE)}>
                            Уникальные цены
                        </Button>
                    </Box>
                    <Avatar size={'md'} bg="teal.500" />
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
                                        return (
                                            <Tr key={index}>
                                                <Td>{user.id}</Td>
                                                <Td>{user.name}</Td>
                                                <Td>{user.surname}</Td>
                                                <Td>{user.contact}</Td>
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
        </>
    )
}

export default AdminPanel
