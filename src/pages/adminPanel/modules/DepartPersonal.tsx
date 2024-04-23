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
import DepartPersonalModal from '../components/departPesonalAddModal'
import { useState } from 'react'
import { EditIcon } from '@chakra-ui/icons'
import Drawler from '@/components/Drawler'
import { ADMIN_USERS_ROUTE, ADMIN_DEPART_PERSONAL_ROUTE } from '@/utils/constants/routes.consts'
import { useNavigate } from 'react-router-dom'
import { useApi } from '@/utils/services/axios'
import { mutate } from 'swr'
import UniversalComponent from '@/components/ui/UniversalComponent'

interface DepartPersonal {
    id: number
    name: string
    surname: string
    status: string
    userClass: string
    fixSalary: string
}

const AdminPanel = () => {
    const navigate = useNavigate()
    const { onOpen, onClose, isOpen } = useDisclosure()
    const [selectedData, setSelectedData] = useState<DepartPersonal | undefined>(undefined)
    const [selectedStatus, setSelectedStatus] = useState<string>('')

    // const { data: departPersonalData } = useApi<DepartPersonal[]>('departPersonal')
    const { data: departPersonalData } = useApi<DepartPersonal[]>('departPersonal', {
        status: selectedStatus,
    })

    console.log(departPersonalData)

    const handleClose = () => {
        onClose()
        setSelectedData(undefined)
    }

    const handledSuccess = () => {
        mutate(['departPersonal', selectedStatus])
    }

    const applyFilters = (status: string) => {
        setSelectedStatus(status)
    }

    return (
        <>
            <UniversalComponent>
                <Box
                    display="flex"
                    justifyContent={'space-between'}
                    flexDirection={'row'}
                    backgroundColor={'rgba(128, 128, 128, 0.1)'}
                >
                    <Box width={'100%'}>
                        <Drawler></Drawler>
                        <Button height={'100%'} onClick={() => navigate(ADMIN_USERS_ROUTE)}>
                            Адмперсонал
                        </Button>
                        <Button
                            height={'100%'}
                            bg={'rgba(217, 217, 217, 1)'}
                            onClick={() => navigate(ADMIN_DEPART_PERSONAL_ROUTE)}
                        >
                            Цехперсонал
                        </Button>
                    </Box>
                    <Avatar size={'md'} bg="teal.500" />
                </Box>
                <Box display="flex" flexDirection="column" height="100vh" p={5}>
                    <Box marginBottom={10} display={'flex'} justifyContent={'space-between'}>
                        <Box display={'flex'} gap={'15px'} width={'fit-content'}>
                            <Select
                                placeholder="Статус"
                                width={'fit-content'}
                                onChange={(e) => applyFilters(e.target.value)}
                            >
                                <option value="Активный">Активный</option>
                                <option value="Неактивный">Неактивный</option>
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
                                    <Th>Статус</Th>
                                    <Th>Должность</Th>
                                    <Th>Фикс Зп.</Th>
                                    <Th>Действия</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {departPersonalData?.map((user, index) => {
                                    return (
                                        <Tr key={index}>
                                            <Td>{user.id}</Td>
                                            <Td>{user.name}</Td>
                                            <Td>{user.surname}</Td>
                                            <Td>{user.status}</Td>
                                            <Td>{user.userClass}</Td>
                                            <Td>{user.fixSalary}</Td>
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
                    <DepartPersonalModal
                        data={selectedData}
                        isOpen={isOpen}
                        onClose={handleClose}
                        onSuccess={handledSuccess}
                    />
                </Box>
            </UniversalComponent>
        </>
    )
}

export default AdminPanel
