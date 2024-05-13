import Drawler from '@/components/Menu'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
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
import ProviderAddModal from '../components/ProviderAddModal'
import { useState } from 'react'
import Dialog from '@/components/Dialog'
import { ADMIN_PROVIDER_ROUTE } from '@/utils/constants/routes.consts'
import { mutate, useApi } from '@/utils/services/axios'
import { deleteProviderGoods } from '@/utils/services/providerGoods.service'
import { useNotify } from '@/utils/providers/ToastProvider'

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
    const { loading } = useNotify()
    const [selectedStatus, setSelectedStatus] = useState('')
    const [dialog, setDialog] = useState({
        isOpen: false,
        onClose: () => setDialog({ ...dialog, isOpen: false }),
    })

    const { data: providerGoodsData } = useApi<ProviderGoods[]>('providerGoods', {
        status: selectedStatus,
    })

    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedData, setSelectedData] = useState<ProviderGoods>()

    const handleSelectChange = (status: string) => {
        console.log('target')
        setSelectedStatus(status)
    }

    const handlerDeleteProvider = (selectedData: ProviderGoods | undefined) => {
        if (selectedData) {
            const responsePromise: Promise<any> = deleteProviderGoods(selectedData.id)
            loading(responsePromise)
            responsePromise.then(() => {
                mutate((currentData: ProviderGoods[] | undefined) => {
                    if (!currentData) return currentData
                    return currentData.filter((item) => item.id !== selectedData?.id)
                })
            })
        } else {
            console.error('No user data available to delete.')
        }
    }

    const handledSuccess = () => {
        mutate(`providerGoods?status=${selectedStatus}`)
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
                                            <IconButton
                                                variant="outline"
                                                size={'sm'}
                                                colorScheme="teal"
                                                aria-label="Send email"
                                                marginRight={3}
                                                onClick={() => {
                                                    setSelectedData(item)
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
                                                    setSelectedData(item)
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
            </Box>
            <Dialog
                    isOpen={dialog.isOpen}
                    onClose={dialog.onClose}
                    header="Удалить"
                    body="Вы уверены? Вы не сможете отменить это действие впоследствии."
                    actionBtn={() => {
                        dialog.onClose()
                        handlerDeleteProvider(selectedData)
                    }}
                    actionText="Удалить"
                />
            <ProviderAddModal isOpen={isOpen} onClose={onClose} selectedData={selectedData} onSuccess={handledSuccess} />
        </>
    )
}

export default AdminProvider
