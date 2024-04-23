import {
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Box,
    useDisclosure,
    Button,
    Avatar,
    Select,
} from '@chakra-ui/react'
import ProductAddModal, { Product } from '../components/ProductAddModal'
import { useState, useEffect } from 'react'
import {
    getAllProducts,
    deleteProduct,
    findByFilters,
} from '../../../utils/services/product.service'
import { getAllBakingFacilityUnits } from '@/utils/services/bakingFacilityUnits.service'
import useSWR from 'swr'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import Drawler from '@/components/Drawler'
import { useNavigate } from 'react-router-dom'
import Dialog from '@/components/Dialog'
import { ADMIN_PRODUCTS_ROUTE } from '@/utils/constants/routes.consts'
import { useApi } from '@/utils/services/axios'

interface ProductList {
    id: number
    name: string
    price: number
    costPrice: number
    status: string
    bakingFacilityUnit: {
        id: number
        facilityUnit: string
    }
}

interface FacilityUnit {
    id: number
    facilityUnit: string
}

const AdminPanel = () => {
    const [filters, setFilters] = useState({ name: '', bakingFacilityUnitId: '', status: '' })

    const { data: facilityUnitsData } = useSWR<FacilityUnit[]>('mixers', {
        fetcher: () => getAllBakingFacilityUnits(),
    })

    // const { data: productsData } = useSWR<ProductList[]>('product', {
    //     fetcher: () => getAllProducts(),
    // })

    const { data: productsData } = useApi<ProductList[]>('product', filters)

    const navigate = useNavigate()
    const { onOpen, isOpen, onClose } = useDisclosure()
    const [selectedData, setSelectedData] = useState<Product>()
    const [data, setData] = useState<ProductList[]>([])
    const [dialog, setDialog] = useState({
        isOpen: false,
        onClose: () => setDialog({ ...dialog, isOpen: false }),
    })

    console.log(filters)

    useEffect(() => {
        getAllProducts().then((responseData) => {
            setData(responseData)
            console.log(responseData)
        })
    }, [])

    const handleAddProduct = () => {
        getAllProducts().then((responseData) => {
            setData(responseData)
        })
    }

    const delProduct = (selectedData: Product | undefined) => {
        if (selectedData) {
            deleteProduct(selectedData.id).then((res) => {
                console.log(res)
            })
        } else {
            console.error('No product data available to delete.')
        }
    }

    const handleClose = () => {
        setSelectedData(undefined)
        onClose()
    }

    useEffect(() => {
        applyFilters()
    }, [filters])

    const applyFilters = async () => {
        findByFilters(filters).then((res) => {
            console.log(res)
            console.log(filters)
            setData(res.data.data)
        })
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
                        onClick={() => navigate(ADMIN_PRODUCTS_ROUTE)}
                        bg={'rgba(217, 217, 217, 1)'}
                    >
                        Продукты
                    </Button>
                </Box>
                <Avatar bg="teal.500" />
            </Box>

            <Box display="flex" flexDirection="column" height="100vh" p={5}>
                <Box marginBottom={10} display={'flex'} justifyContent={'space-between'}>
                    <Box display={'flex'} gap={'15px'} width={'fit-content'}>
                        <Select
                            placeholder="Имя"
                            width={'fit-content'}
                            name="name"
                            onChange={handleSelectChange}
                        >
                            {productsData?.map((product, index) => (
                                <option key={index} value={product.name}>
                                    {product.name}
                                </option>
                            ))}
                        </Select>
                        <Select
                            placeholder="Цех"
                            width={'fit-content'}
                            name="bakingFacilityUnitId"
                            onChange={handleSelectChange}
                        >
                            {facilityUnitsData?.map((unit, index) => (
                                <option key={index} value={unit.id}>
                                    {unit.facilityUnit}
                                </option>
                            ))}
                        </Select>
                        <Select
                            placeholder="Статус"
                            width={'fit-content'}
                            name="status"
                            onChange={handleSelectChange}
                        >
                            <option value="1">Активен</option>
                            <option value="0">Приостановлен</option>
                        </Select>
                    </Box>

                    <Button colorScheme="purple" onClick={onOpen}>
                        Добавить
                    </Button>
                </Box>
                <TableContainer maxWidth={'100%'} width={'100%'}>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>№</Th>
                                <Th>Наименование</Th>
                                <Th>Цех</Th>
                                <Th>Статус</Th>
                                <Th>Цена</Th>
                                <Th>Себестоимость</Th>
                                <Th>Действия</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map((product, index) => {
                                return (
                                    <Tr key={index}>
                                        <Td>{product.id}</Td>
                                        <Td>{product.name}</Td>
                                        <Td>{product.bakingFacilityUnit?.facilityUnit}</Td>
                                        <Td>{product.status}</Td>
                                        <Td>{product.price}</Td>
                                        <Td>{product.costPrice}</Td>
                                        <Td>
                                            <EditIcon
                                                boxSize={'1.5em'}
                                                cursor={'pointer'}
                                                onClick={() => {
                                                    setSelectedData(product)
                                                    onOpen()
                                                }}
                                            />
                                            <DeleteIcon
                                                boxSize={'1.5em'}
                                                color={'red'}
                                                cursor={'pointer'}
                                                onClick={() => {
                                                    setSelectedData(product)
                                                    setDialog({
                                                        ...dialog,
                                                        isOpen: true,
                                                    })
                                                }}
                                            />
                                        </Td>
                                    </Tr>
                                )
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
                <ProductAddModal
                    data={selectedData}
                    isOpen={isOpen}
                    onClose={handleClose}
                    onAddProduct={handleAddProduct}
                />
                <Dialog
                    isOpen={dialog.isOpen}
                    onClose={dialog.onClose}
                    header="Удалить"
                    body="Вы уверены? Вы не сможете отменить это действие впоследствии."
                    actionBtn={() => {
                        dialog.onClose()
                        delProduct(selectedData)
                    }}
                    actionText="Удалить"
                />
            </Box>
        </>
    )
}

export default AdminPanel
