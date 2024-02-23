import {
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Box,
    IconButton,
    useDisclosure,
    Button,
    Avatar,
    Select,
} from '@chakra-ui/react'
import UserAddModal from '../components/UserAddModal'
import { useEffect, useState } from 'react'
import { getAllUsers } from '../../../utils/services/user.service'
import { EditIcon } from '@chakra-ui/icons'
import Drawler from '@/components/Drawler'
import { ADMIN_USERS_ROUTE } from '@/utils/constants/routes.consts'
import { useNavigate } from 'react-router-dom'

interface Users {
    id: number
    name: string
    pass: string
    phone: string
    userClass: string
}

const AdminPanel = () => {
    const navigate = useNavigate()
    const { onOpen, onClose, isOpen } = useDisclosure()
    const [selectedData, setSelectedData] = useState<Users | undefined>(undefined)
    const [data, setData] = useState<Users[]>([])

    const handleClose = () => {
        onClose()
        setSelectedData(undefined)
        //console.log(selectedData)
    }

    useEffect(() => {
        getAllUsers().then((responseData) => {
            setData(responseData)
        })
    }, [])

    // const delProduct = (data: ProductList) => {
    //     deleteProduct(data.id).then((res) => {
    //         console.log(res)
    //     })
    // }

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
                        width={'20%'}
                        onClick={() => navigate(ADMIN_USERS_ROUTE)}
                    >
                        Пользователи
                    </Button>
                </Box>
                <Avatar size={'md'} bg="teal.500" />
            </Box>
            <Box display="flex" flexDirection="column" height="100vh" p={5}>
                <Box marginBottom={10} display={'flex'} justifyContent={'space-between'}>
                    <Box display={'flex'} gap={'15px'} width={'fit-content'}>
                        <Select placeholder="Статус" width={'fit-content'}>
                            <option value="Активен">Активен</option>
                            <option value="Приостановлен">Приостановлен</option>
                        </Select>
                    </Box>

                    <Button colorScheme="purple" onClick={onOpen}>
                        Добавить
                    </Button>
                </Box>
                <TableContainer>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>№</Th>
                                <Th>Имя</Th>
                                <Th>Фамилия</Th>
                                <Th>Телефон</Th>
                                <Th>Статус</Th>
                                <Th>Должность</Th>
                                <Th>Действия</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map((user, index) => {
                                return (
                                    <Tr key={index}>
                                        <Td>{user.id}</Td>
                                        <Td>{user.name}</Td>
                                        <Td>{'Вдлжьывы'}</Td>
                                        <Td>{user.phone}</Td>
                                        <Td>{'Активен'}</Td>
                                        <Td>{user.userClass}</Td>
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
                <UserAddModal data={selectedData} isOpen={isOpen} onClose={handleClose} />
            </Box>
        </>
    )
}

export default AdminPanel
