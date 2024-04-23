import Drawler from '@/components/Drawler'
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
import ProviderAddModal from '../components/ProviderAddModal'
import { useState } from 'react'
import Dialog from '@/components/Dialog'
import { ADMIN_PROVIDER_ROUTE } from '@/utils/constants/routes.consts'
import { useApi } from '@/utils/services/axios'

interface ProviderGoods {
    id: number
    providerId: number
    goods: string
    unitOfMeasure: string
    place: string
    status: string
    provider: {
        id: number
        name: string
    }
}

const AdminProvider = () => {
    const [selectedStatus, setSelectedStatus] = useState('')

    const { data: providerGoodsData } = useApi<ProviderGoods[]>('providerGoods', {
        status: selectedStatus,
    })

    console.log(providerGoodsData)
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedData, setSelectedData] = useState<ProviderGoods>()

    const [deleteDialog, setDeleteDialog] = useState({
        isOpen: false,
        onClose: () => setDeleteDialog({ ...deleteDialog, isOpen: false }),
    })

    const handleSelectChange = (status: string) => {
        console.log('target')
        setSelectedStatus(status)
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
                        onClick={() => navigate(ADMIN_PROVIDER_ROUTE)}
                        bg={'rgba(217, 217, 217, 1)'}
                    >
                        Поставщик товары
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
                            onChange={(e) => handleSelectChange(e.target.value)}
                        >
                            <option value="Активный">Активный</option>
                            <option value="Неактивный">Неактивный</option>
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
                            {providerGoodsData?.map((item, index) => {
                                return (
                                    <Tr key={index}>
                                        <Td>{index + Number(1)}</Td>
                                        <Td>{item.provider.name}</Td>
                                        <Td>{item.goods}</Td>
                                        <Td>{item.unitOfMeasure}</Td>
                                        {/* <Td>
                                            {item.bakery.map((type) => {
                                                return <Box>{type.label}</Box>
                                            })}
                                        </Td> */}
                                        <Td>{item.place}</Td>
                                        <Td>{item.status}</Td>
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
