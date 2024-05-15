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
import { useState } from 'react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { ADMIN_USERS_ROUTE, ADMIN_DEPART_PERSONAL_ROUTE } from '@/utils/constants/routes.consts'
import { useNavigate } from 'react-router-dom'
import { useApi } from '@/utils/services/axios'
import { mutate } from 'swr'
import UniversalComponent from '@/components/ui/UniversalComponent'
import Dialog from '@/components/Dialog'
import { useNotify } from '@/utils/providers/ToastProvider'
import { deleteDepartPersonal } from '@/utils/services/departPersonal.service'
import { TableContainer, Thead } from '@/components/ui'
import DepartPersonalModal from '../components/DepartPesonalAddModal'
import Header from '@/components/Header'

interface DepartPersonal {
    id: number
    name: string
    surname: string
    status: string
    userClass: string
    fixSalary: string
}

const AdminPanel = () => {
    const { loading } = useNotify()
    const navigate = useNavigate()
    const { onOpen, onClose, isOpen } = useDisclosure()
    const [selectedData, setSelectedData] = useState<DepartPersonal | undefined>(undefined)
    const [selectedStatus, setSelectedStatus] = useState<string>('')
    const [dialog, setDialog] = useState({
        isOpen: false,
        onClose: () => setDialog({ ...dialog, isOpen: false }),
    })

    // const { data: departPersonalData } = useApi<DepartPersonal[]>('departPersonal')
    const { data: departPersonalData, isLoading } = useApi<DepartPersonal[]>('departPersonal', {
        status: selectedStatus,
    })

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

    const deleteUser = (selectedData: DepartPersonal | undefined) => {
        if (selectedData) {
            const responsePromise: Promise<any> = deleteDepartPersonal(selectedData.id)
            loading(responsePromise)
            responsePromise.then(() => {
                mutate((currentData: DepartPersonal[] | undefined) => {
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
                    <TableContainer isLoading={isLoading} style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
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
                                    const count: number = index + 1
                                    return (
                                        <Tr key={index}>
                                            <Td>{count}</Td>
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
                    <DepartPersonalModal
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
                            deleteUser(selectedData)
                        }}
                        actionText="Удалить"
                    />
                </Box>
            </UniversalComponent>
        </>
    )
}

export default AdminPanel
