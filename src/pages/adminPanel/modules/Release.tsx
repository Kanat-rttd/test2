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
import { useState } from 'react'

const AdminPanel = () => {
    const navigate = useNavigate()
    const { onOpen, onClose, isOpen } = useDisclosure()
    const [selectedData, setSelectedData] = useState<Releaser | undefined>(undefined)

    const data = [
        {
            id: 1,
            name: 'Алишер',
            surname: '',
            phone: '+77007007070',
            telegram: '-0101010101',
            status: 'Активен',
        },
    ]
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
                            <Select placeholder="Имя" width={'fit-content'}>
                                <option value="Алишер">Алишер</option>
                            </Select>
                            <Select placeholder="Телеграм ID" width={'fit-content'}>
                                <option value="-0101010101">-0101010101</option>
                            </Select>
                            <Select placeholder="Статус" width={'fit-content'}>
                                <option value="Активен">Активен</option>
                                <option value="Приостановлен">Приостановлен</option>
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
                                                <Td>{user.phone}</Td>
                                                <Td>{user.telegram}</Td>
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
            <ReleaseAddModal onClose={onClose} isOpen={isOpen} data={selectedData} />
        </>
    )
}

export default AdminPanel
