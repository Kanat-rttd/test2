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
import { getAllClients, findByFilters } from '@/utils/services/client.service'

const AdminPanel = () => {
    const navigate = useNavigate()
    const { onOpen, onClose, isOpen } = useDisclosure()
    const [selectedData, setSelectedData] = useState<Releaser | undefined>(undefined)
    const [data, setData] = useState<Releaser[]>([])
    const [filters, setFilters] = useState({ name: '', telegrammId: '', status: '' })

    useEffect(() => {
        getAllClients().then((responseData) => {
            setData(responseData)
            console.log(responseData)
        })
    }, [])

    useEffect(() => {
        applyFilters()
    }, [filters])

    const onCloseModal = () => {
        setSelectedData(undefined)
        onClose()
    }

    const applyFilters = async () => {
        findByFilters(filters).then((res) => {
            console.log(res)
            setData(res.data.data)
        })
    }

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }))
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
                            width={'20%'}
                            onClick={() => navigate(ADMIN_RELEASE_ROUTE)}
                        >
                            Реализаторы
                        </Button>
                        <Button
                            bg={'rgba(217, 217, 217, 1)'}
                            height={'100%'}
                            width={'20%'}
                            onClick={() => navigate(ADMIN_UNIQUEPRICE_ROUTE)}
                        >
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
                                <option value="Алишер">Алишер</option>
                            </Select>
                            <Select
                                name="telegrammId"
                                placeholder="Телеграм ID"
                                width={'fit-content'}
                                onChange={handleSelectChange}
                            >
                                <option value="-0101010101">-0101010101</option>
                            </Select>
                            <Select
                                name="status"
                                placeholder="Статус"
                                width={'fit-content'}
                                onChange={handleSelectChange}
                            >
                                <option value="1">Активен</option>
                                <option value="0">Приостановлен</option>
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
                                    {data.map((user, index) => {
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
            <ReleaseAddModal onClose={onCloseModal} isOpen={isOpen} data={selectedData} />
        </>
    )
}

export default AdminPanel
