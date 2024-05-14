import {
    Table,
    Tr,
    Th,
    Tbody,
    Td,
    Box,
    IconButton,
    useDisclosure,
    Button,
    Select,
} from '@chakra-ui/react'
import UserAddModal from '../components/UserAddModal'
import { useState } from 'react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { ADMIN_USERS_ROUTE, ADMIN_DEPART_PERSONAL_ROUTE } from '@/utils/constants/routes.consts'
import { useNavigate } from 'react-router-dom'

import { useApi, mutate } from '@/utils/services/axios'
// import Header from '@/components/Header'
import Dialog from '@/components/Dialog'
import { deleteUser } from '@/utils/services/user.service'
import { useNotify } from '@/utils/providers/ToastProvider'
import { User } from '@/utils/types/user.types'
import { TableContainer, Thead } from '@/components/ui'
import Header from '@/components/Header'
import UniversalComponent from '@/components/ui/UniversalComponent'
// import { mutate } from 'swr'
// import { getAllUsers } from '../../../utils/services/user.service'

const AdminPanel = () => {
    const { loading } = useNotify()
    const navigate = useNavigate()
    const { onOpen, onClose, isOpen } = useDisclosure()
    const [selectedData, setSelectedData] = useState<User | undefined>(undefined)
    const [selectedStatus, setSelectedStatus] = useState<string>('')
    const [dialog, setDialog] = useState({
        isOpen: false,
        onClose: () => setDialog({ ...dialog, isOpen: false }),
    })

    // const { data: usersData } = useSWR<Users[]>(['user', selectedStatus], {
    //     fetcher: () => getAllUsers(selectedStatus),
    // })

    const { data: usersData, isLoading } = useApi<User[]>('user', {
        status: selectedStatus,
    })

    console.log(usersData)

    const handleClose = () => {
        setSelectedData(undefined)
        onClose()
    }

    const handledSuccess = () => {
        console.log('another response')
        // mutate('user')
        mutate(`user?selectedStatus=${selectedStatus}`)
    }

    const applyFilters = (status: string) => {
        setSelectedStatus(status)
    }

    const handlerDeleteUser = (selectedData: User | undefined) => {
        if (selectedData) {
            const responsePromise: Promise<any> = deleteUser(selectedData.id)
            loading(responsePromise)
            responsePromise.then(() => {
                // mutate('user?selectedStatus=${selectedStatus}')
                mutate((currentData: User[] | undefined) => {
                    if (!currentData) return currentData
                    return currentData.filter((client) => client.id !== selectedData?.id)
                })
            })
        } else {
            console.error('No user data available to delete.')
        }
    }

    return (
        <>
            <UniversalComponent>
                <Header>
                    <Button
                        height={'100%'}
                        onClick={() => navigate(ADMIN_USERS_ROUTE)}
                        bg={'rgba(217, 217, 217, 1)'}
                    >
                        Адмперсонал
                    </Button>
                    <Button height={'100%'} onClick={() => navigate(ADMIN_DEPART_PERSONAL_ROUTE)}>
                        Цехперсонал
                    </Button>
                </Header>

                <Box display="flex" flexDirection="column" p={5}>
                    <Box marginBottom={5} display={'flex'} justifyContent={'space-between'}>
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
                    <TableContainer isLoading={isLoading}>
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>№</Th>
                                    <Th>Имя</Th>
                                    <Th>Фамилия</Th>
                                    <Th>Телефон</Th>
                                    <Th>Статус</Th>
                                    <Th>Должность</Th>
                                    <Th>Фикс Зп.</Th>
                                    <Th>Действия</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {usersData?.map((user, index) => {
                                    const ordinalNumber: number = index + 1
                                    return (
                                        <Tr key={index}>
                                            <Td>{ordinalNumber}</Td>
                                            <Td>{user.name}</Td>
                                            <Td>{user.surname}</Td>
                                            <Td>{user.phone}</Td>
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
                    <UserAddModal
                        data={selectedData}
                        isOpen={isOpen}
                        onClose={handleClose}
                        onSuccess={handledSuccess}
                    />
                    <Dialog
                        isOpen={dialog.isOpen}
                        onClose={dialog.onClose}
                        header="Удалить"
                        body="Вы уверены? Вы не сможете отменить это действие впоследствии."
                        actionBtn={() => {
                            dialog.onClose()
                            handlerDeleteUser(selectedData)
                        }}
                        actionText="Удалить"
                    />
                </Box>
            </UniversalComponent>
        </>
    )
}

export default AdminPanel
