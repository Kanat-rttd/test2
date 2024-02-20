import {
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Box,
    IconButton,
    useDisclosure,
    Button,
} from '@chakra-ui/react'
import TopNavBar from '../../../components/NavBar'
import ProductAddModal from '../components/ProductAddModal'
import FacilityUnitAddModal from '../components/FacilityUnitAddModal'
import { useEffect, useState } from 'react'
import { getAllProducts, deleteProduct } from '../../../utils/services/product.service'
import { ProductList } from '../../../utils/types/types'

import { EditIcon, DeleteIcon } from '@chakra-ui/icons'

const AdminPanel = () => {
    const {
        onOpen: openProductModal,
        onClose: closeProductModal,
        isOpen: isProductModalOpen,
    } = useDisclosure()
    const {
        onOpen: openFacilityModal,
        onClose: closeFacilityModal,
        isOpen: isFacilityModalOpen,
    } = useDisclosure()
    const [selectedData, setSelectedData] = useState<ProductList>()
    const [data, setData] = useState<ProductList[]>([])

    const handleProductClose = () => {
        closeProductModal()
        setSelectedData(undefined)
    }

    const handleFacilityClose = () => {
        closeFacilityModal()
    }

    useEffect(() => {
        getAllProducts().then((responseData) => {
            setData(responseData)
            console.log(responseData)
        })
    }, [])

    const delProduct = (data: ProductList) => {
        deleteProduct(data.id).then((res) => {
            //console.log(res)
        })
    }

    return (
        <>
            <TopNavBar></TopNavBar>
            <Box display="flex" flexDirection="column" height="100vh" p={5}>
                <Box marginBottom={5} textAlign={'right'}>
                    <Button onClick={openFacilityModal}>Добавить цех</Button>
                    <FacilityUnitAddModal
                        isOpen={isFacilityModalOpen}
                        onClose={handleFacilityClose}
                    />
                </Box>
                <Box marginBottom={5} textAlign={'right'}>
                    <Button onClick={openProductModal}>Добавить продукт</Button>
                    <ProductAddModal
                        data={selectedData}
                        isOpen={isProductModalOpen}
                        onClose={handleProductClose}
                    />
                </Box>
                <TableContainer maxWidth={'100%'} width={'100%'}>
                    <Table variant="striped" colorScheme="teal" size="lg" width={'100%'}>
                        <Thead>
                            <Tr>
                                <Th p={0}>Выпечка</Th>
                                <Th p={0}>Цех</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map((product, index) => {
                                return (
                                    <Tr key={index}>
                                        <Td>{product.name}</Td>
                                        <Td>{product.bakingFacilityUnit.facilityUnit}</Td>
                                        <Td sx={{ width: '5%' }}>
                                            <IconButton
                                                variant="outline"
                                                size={'sm'}
                                                colorScheme="teal"
                                                aria-label="Send email"
                                                marginRight={3}
                                                onClick={() => {
                                                    setSelectedData(product)
                                                    openProductModal()
                                                }}
                                                icon={<EditIcon />}
                                            />
                                            <IconButton
                                                variant="outline"
                                                size={'sm'}
                                                colorScheme="teal"
                                                aria-label="Send email"
                                                onClick={() => {
                                                    setData(
                                                        data.filter(
                                                            (elem) => elem.id !== product.id,
                                                        ),
                                                    )
                                                    delProduct(product)
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
        </>
    )
}

export default AdminPanel
