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
import ProductAddModal from '../components/ProductAddModal'
import { useState, useEffect } from 'react'
import {
    getAllProducts,
    deleteProduct,
    findByFilters,
} from '../../../utils/services/product.service'
import { getAllBakingFacilityUnits } from '@/utils/services/bakingFacilityUnits.service'
import useSWR from 'swr'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import Dialog from '@/components/Dialog'
import { ADMIN_PRODUCTS_ROUTE } from '@/utils/constants/routes.consts'
import { useApi } from '@/utils/services/axios'
import { FacilityUnit, Product } from '@/utils/types/product.types'
import { TableContainer, Thead } from '@/components/ui'
import Header from '@/components/Header'

enum Status {
    ACTIVE = 0,
    INACTIVE = 1,
}

const AdminPanel = () => {
    const navigate = useNavigate()
    const { onOpen, isOpen, onClose } = useDisclosure()

    const { data: dataForSelect } = useApi<Product[]>('product')
    const [filters, setFilters] = useState({ name: '', bakingFacilityUnitId: '', status: '' })

    const { data: facilityUnitsData } = useSWR<FacilityUnit[]>('mixers', {
        fetcher: () => getAllBakingFacilityUnits(),
    })

    const { data: productsData, isLoading } = useApi<Product[]>('product', filters)

    const [selectedData, setSelectedData] = useState<Product>()
    const [data, setData] = useState<Product[]>([])
    const [dialog, setDialog] = useState({
        isOpen: false,
        onClose: () => setDialog({ ...dialog, isOpen: false }),
    })

    const productStatus = [
        { id: 0, label: 'Активный' },
        { id: 1, label: 'Неактивный' },
    ]

    useEffect(() => {
        setData(productsData || [])
    }, [productsData])

    const handleAddProduct = () => {
        getAllProducts().then((responseData) => {
            setData(responseData)
        })
    }

    const delProduct = (selectedData: Product | undefined) => {
        if (selectedData) {
            deleteProduct(selectedData.id).then((res) => {
                console.log(res)
                handleAddProduct()
                setSelectedData(undefined)
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
            <Header>
                <Button
                    height={'100%'}
                    onClick={() => navigate(ADMIN_PRODUCTS_ROUTE)}
                    bg={'rgba(217, 217, 217, 1)'}
                >
                    Продукты
                </Button>
            </Header>
            <Box display="flex" flexDirection="column" p={5}>
                <Box marginBottom={5} display={'flex'} justifyContent={'space-between'}>
                    <Box display={'flex'} gap={'15px'} width={'fit-content'}>
                        <Select
                            placeholder="Наименование"
                            width={'fit-content'}
                            name="name"
                            onChange={handleSelectChange}
                        >
                            {dataForSelect?.map((product, index) => (
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
                            {productStatus.map((item) => {
                                return <option value={item.id}>{item.label}</option>
                            })}
                        </Select>
                    </Box>

                    <Button colorScheme="purple" onClick={onOpen}>
                        Добавить
                    </Button>
                </Box>
                <TableContainer maxWidth={'100%'} width={'100%'} isLoading={isLoading}>
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
                            {data
                                ?.sort((a, b) => a.id - b.id)
                                .map((product, index) => {
                                    const ordinalNumber: number = index + 1
                                    return (
                                        <Tr key={index}>
                                            <Td>{ordinalNumber}</Td>
                                            <Td>{product.name}</Td>
                                            <Td>{product.bakingFacilityUnit?.facilityUnit}</Td>
                                            <Td>
                                                {Number(product.status) == Status.ACTIVE
                                                    ? 'Активный'
                                                    : 'Неактивный'}
                                            </Td>
                                            <Td>{product.price}</Td>
                                            <Td>{product.costPrice}</Td>
                                            <Td>
                                                <IconButton
                                                    variant="outline"
                                                    size={'sm'}
                                                    colorScheme="teal"
                                                    aria-label="Send email"
                                                    marginRight={3}
                                                    onClick={() => {
                                                        setSelectedData(product)
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
                                                        setSelectedData(product)
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
