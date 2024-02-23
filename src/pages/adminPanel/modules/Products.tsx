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
import { useState } from 'react'
// import { getAllProducts, deleteProduct } from '../../../utils/services/product.service'
// import { ProductList } from '../../../utils/types/types'
import { EditIcon } from '@chakra-ui/icons'
import Drawler from '@/components/Drawler'
import { useNavigate } from 'react-router-dom'
import { ADMIN_PRODUCTS_ROUTE } from '@/utils/constants/routes.consts'

const AdminPanel = () => {
    const navigate = useNavigate()
    const { onOpen, isOpen, onClose } = useDisclosure()
    const [selectedData, setSelectedData] = useState<Product>()
    // const [data, setData] = useState<ProductList[]>([])

    // const handleProductClose = () => {
    //     closeProductModal()
    //     setSelectedData(undefined)
    // }

    // const handleFacilityClose = () => {
    //     closeFacilityModal()
    // }

    // useEffect(() => {
    //     getAllProducts().then((responseData) => {
    //         setData(responseData)
    //         console.log(responseData)
    //     })
    // }, [])

    // const delProduct = (data: ProductList) => {
    //     deleteProduct(data.id).then((res) => {
    //         console.log(res)
    //     })
    // }

    const data = [
        {
            id: 1,
            name: 'Итальяснкий',
            bakerType: 'Бетонный',
            status: 'Активен',
            price: 100,
            costPrice: 50,
        },
    ]

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
                        onClick={() => navigate(ADMIN_PRODUCTS_ROUTE)}
                        background={'#D8D9D9'}
                    >
                        Продукты
                    </Button>
                </Box>
                <Avatar bg="teal.500" />
            </Box>

            <Box display="flex" flexDirection="column" height="100vh" p={5}>
                <Box marginBottom={10} display={'flex'} justifyContent={'space-between'}>
                    <Box display={'flex'} gap={'15px'} width={'fit-content'}>
                        <Select placeholder="Имя" width={'fit-content'}>
                            <option value="Наименование">Итальянский</option>
                        </Select>
                        <Select placeholder="Цех" width={'fit-content'}>
                            <option value="Батонный">Батонный</option>
                        </Select>
                        <Select placeholder="Статус" width={'fit-content'}>
                            <option value="Активен">Активен</option>
                            <option value="Приостановлен">Приостановлен</option>
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
                                        <Td>{product.bakerType}</Td>
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
                                        </Td>
                                    </Tr>
                                )
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
                <ProductAddModal data={selectedData} isOpen={isOpen} onClose={onClose} />
            </Box>
        </>
    )
}

export default AdminPanel
