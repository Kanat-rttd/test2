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
import { useApi } from '@/utils/services/axios'
import UniversalComponent from '@/components/ui/UniversalComponent'
import Dialog from '@/components/Dialog'
import { useNotify } from '@/utils/providers/ToastProvider'
import { deleteDepartPersonal } from '@/utils/services/departPersonal.service'
import { TableContainer, Thead } from '@/components/ui'
import DepartPersonalModal from '../components/DepartPesonalAddModal'
import { DepartPersonalType } from '@/utils/types/departPersonal.types'

const AdminPanel = () => {
    const { success, error } = useNotify()
    const { onOpen, onClose, isOpen } = useDisclosure()
    const [selectedData, setSelectedData] = useState<DepartPersonalType | undefined>(undefined)
    const [selectedStatus, setSelectedStatus] = useState<string>('')
    const [dialog, setDialog] = useState({
        isOpen: false,
        onClose: () => setDialog({ ...dialog, isOpen: false }),
    })

    const {
        data: departPersonalData,
        isLoading,
        mutate: mutateDepartPersonal,
    } = useApi<DepartPersonalType[]>('departPersonal', {
        status: selectedStatus,
    })

    const handleClose = () => {
        onClose()
        setSelectedData(undefined)
    }

    const handledSuccess = () => {
        mutateDepartPersonal()
    }

    const applyFilters = (status: string) => {
        setSelectedStatus(status)
    }

    const deleteUser = (selectedData: DepartPersonalType | undefined) => {
        if (selectedData) {
            const responsePromise: Promise<any> = deleteDepartPersonal(selectedData.id)
            responsePromise.then((res) => {
                mutateDepartPersonal()
                success(res.data.message)
            })
        } else {
            console.error('No user data available to delete.')
            error('Произошла ошибка')
        }
        setSelectedData(undefined)
    }

    return (
        <>
            <UniversalComponent>
                <Box display="flex" flexDirection="column" p={5}>
                    <Box marginBottom={6} display={'flex'} justifyContent={'space-between'}>
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
                    <TableContainer
                        isLoading={isLoading}
                        style={{ width: '100%', height: '100%', overflowY: 'auto' }}
                    >
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
                        onClose={() => {
                            dialog.onClose()
                            setSelectedData(undefined)
                        }}
                        header="Удалить"
                        body="Вы уверены? Вы не сможете отменить это действие впоследствии."
                        actionBtn={() => {
                            dialog.onClose()
                            deleteUser(selectedData)
                            setSelectedData(undefined)
                        }}
                        actionText="Удалить"
                    />
                </Box>
            </UniversalComponent>
        </>
    )
}

export default AdminPanel
