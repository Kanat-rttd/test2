import {
    Table,
    Tr,
    Th,
    Tbody,
    Td,
    Box,
    useDisclosure,
    Button,
    Select,
    IconButton,
} from '@chakra-ui/react'
import { useState } from 'react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import Dialog from '@/components/Dialog'
import { mutate, useApi } from '@/utils/services/axios'
import MagazineAddModal from '../components/MagazineAddModal'
import { useNotify } from '@/utils/providers/ToastProvider'
import { deleteMagazines } from '@/utils/services/magazines.service'
import { TableContainer, Thead } from '@/components/ui'

interface Magazines {
    id: number
    name: string
    clientId: number
    status: string
    client: {
        id: number
        name: string
    }
}

interface Client {
    id: string
    name: string
    surname: string
    contact: string
    telegrammId: string
    status: string
}

const AdminPanel = () => {
    const { loading } = useNotify()
    const [filters, setFilters] = useState({ name: '', clientId: '', status: '' })
    const { data: magazinesDataForSelect } = useApi<Magazines[]>('magazines')

    const { data: magazinesData, isLoading } = useApi<Magazines[]>('magazines', filters)
    const { data: clientsData } = useApi<Client[]>('client')

    console.log(filters)

    // const { data: facilityUnitsData } = useSWR<FacilityUnit[]>('mixers', {
    //     fetcher: () => getAllBakingFacilityUnits(),
    // })

    // const { data: productsData } = useSWR<ProductList[]>('product', {
    //     fetcher: () => getAllProducts(),
    // })

    const { onOpen, isOpen, onClose } = useDisclosure()
    const [selectedData, setSelectedData] = useState<Magazines>()
    // const [data, setData] = useState<ProductList[]>([])
    const [dialog, setDialog] = useState({
        isOpen: false,
        onClose: () => setDialog({ ...dialog, isOpen: false }),
    })

    // useEffect(() => {
    //     getAllProducts().then((responseData) => {
    //         setData(responseData)
    //         console.log(responseData)
    //     })
    // }, [])

    const handledSuccess = () => {
        console.log('another response')
        // mutate('user')
        mutate(`magazines`)
    }

    const deleteMagazine = (selectedData: Magazines | undefined) => {
        if (selectedData) {
            const responsePromise: Promise<any> = deleteMagazines(selectedData.id)
            loading(responsePromise)
            responsePromise.then(() => {
                mutate((currentData: Magazines[] | undefined) => {
                    if (!currentData) return currentData
                    return currentData.filter((client) => client.id !== selectedData?.id)
                })
            })
        } else {
            console.error('No user data available to delete.')
        }
    }

    const handleClose = () => {
        setSelectedData(undefined)
        onClose()
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
            <Box display="flex" flexDirection="column" p={5}>
                <Box mb={5} mt={1} display={'flex'} justifyContent={'space-between'}>
                    <Box display={'flex'} gap={'15px'} width={'fit-content'}>
                        <Select
                            placeholder="Магазины"
                            width={'fit-content'}
                            name="name"
                            onChange={handleSelectChange}
                        >
                            {magazinesDataForSelect?.map((product, index) => (
                                <option key={index} value={product.name}>
                                    {product.name}
                                </option>
                            ))}
                        </Select>
                        <Select
                            placeholder="Реализатор"
                            width={'fit-content'}
                            name="clientId"
                            onChange={handleSelectChange}
                        >
                            {clientsData?.map((unit, index) => (
                                <option key={index} value={unit.id}>
                                    {unit.name}
                                </option>
                            ))}
                        </Select>
                        <Select
                            placeholder="Статус"
                            width={'fit-content'}
                            name="status"
                            onChange={handleSelectChange}
                        >
                            <option value="Активный">Активный</option>
                            <option value="Приостановленный">Приостановленный</option>
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
                                <Th>Магазин</Th>
                                <Th>Реализатор</Th>
                                <Th>Статус</Th>
                                <Th>Действия</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {magazinesData?.map((item, index) => {
                                return (
                                    <Tr key={index}>
                                        <Td>{item.id}</Td>
                                        <Td>{item.name}</Td>
                                        <Td>{item.client.name}</Td>
                                        <Td>{item.status}</Td>
                                        <Td>
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
                <MagazineAddModal
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
                        deleteMagazine(selectedData)
                    }}
                    actionText="Удалить"
                />
            </Box>
        </>
    )
}

export default AdminPanel
