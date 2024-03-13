import Drawler from '@/components/Drawler'
import { ADMIN_PROVIDER_ROUTE } from '@/utils/constants/routes.consts'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
    Avatar,
    Box,
    Button,
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
import ProviderAddModal, { ProviderInputs } from '../components/ProviderAddModal'
import { useState } from 'react'
import Dialog from '@/components/Dialog'

const AdminProvider = () => {
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedData, setSelectedData] = useState<ProviderInputs>()
    const data = [
        {
            id: 1,
            provider: 'Рынок',
            items: 'Мука',
            unity: 'Кг',
            bakery: [{ value: 1, label: 'Батонный' }],
            status: [{ value: 1, label: 'Активный' }],
        },
    ]
    const [deleteDialog, setDeleteDialog] = useState({
        isOpen: false,
        onClose: () => setDeleteDialog({ ...deleteDialog, isOpen: false }),
    })

    const handleSelectChange = () => {
        console.log('target')
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
                        width={'20%'}
                        onClick={() => navigate(ADMIN_PROVIDER_ROUTE)}
                        bg={'rgba(217, 217, 217, 1)'}
                    >
                        Реализаторы
                    </Button>
                </Box>
                <Avatar size={'md'} bg="teal.500" />
            </Box>

            <Box width={'100%'} height={'100%'} p={5}>
                <Box marginBottom={10} display={'flex'} justifyContent={'space-between'}>
                    <Box display={'flex'} gap={'15px'} width={'fit-content'}>
                        <Select
                            name="status"
                            placeholder="Статус"
                            width={'fit-content'}
                            onChange={handleSelectChange}
                        >
                            <option value="Активен">Активен</option>
                            <option value="Неактивен">Неактивен</option>
                        </Select>
                    </Box>

                    <Button colorScheme="purple" onClick={onOpen}>
                        Добавить
                    </Button>
                </Box>
            </Box>

            <Box padding={10}>
                <TableContainer>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>№</Th>
                                <Th>Поставщик</Th>
                                <Th>Товары</Th>
                                <Th>Единица измерения</Th>
                                <Th>Место</Th>
                                <Th>Статус</Th>
                                <Th>Действия</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map((item, index) => {
                                return (
                                    <Tr key={index}>
                                        <Td>{item.id}</Td>
                                        <Td>{item.provider}</Td>
                                        <Td>{item.items}</Td>
                                        <Td>{item.unity}</Td>
                                        <Td>
                                            {item.bakery.map((type) => {
                                                return <Box>{type.label}</Box>
                                            })}
                                        </Td>
                                        <Td>
                                            {item.status.map((type) => {
                                                return <Box>{type.label}</Box>
                                            })}
                                        </Td>
                                        <Td sx={{ width: '5%' }}>
                                            <EditIcon
                                                boxSize={5}
                                                cursor={'pointer'}
                                                onClick={() => {
                                                    setSelectedData(item)
                                                    onOpen()
                                                }}
                                            />
                                            <DeleteIcon
                                                boxSize={5}
                                                cursor={'pointer'}
                                                color={'red'}
                                                onClick={() =>
                                                    setDeleteDialog({
                                                        ...deleteDialog,
                                                        isOpen: true,
                                                    })
                                                }
                                            />
                                        </Td>
                                    </Tr>
                                )
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
            <Dialog
                isOpen={deleteDialog.isOpen}
                onClose={deleteDialog.onClose}
                header="Удалить запись?"
                body={<></>}
                actionBtn={() => console.log('Удалить')}
                actionText="Удалить"
            />
            <ProviderAddModal isOpen={isOpen} onClose={onClose} selectedData={selectedData} />
        </>
    )
}

export default AdminProvider
