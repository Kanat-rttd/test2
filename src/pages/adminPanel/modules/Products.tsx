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
import { useEffect, useState } from 'react'
import { getAllProducts, deleteProduct } from '../../../utils/services/product.service'
import { ProductList } from '../../../utils/types/types'

import { EditIcon, DeleteIcon } from '@chakra-ui/icons'

const AdminPanel = () => {
    const { onOpen, onClose, isOpen } = useDisclosure()
    const [selectedData, setSelectedData] = useState<ProductList>()
    const [data, setData] = useState<ProductList[]>([])

    console.log(data)

    const handleClose = () => {
        onClose()
        setSelectedData(undefined)
    }

    useEffect(() => {
        getAllProducts().then((responseData) => {
            setData(responseData)
        })
    }, [])

    const delProduct = (data: ProductList) => {
        deleteProduct(data.id).then((res) => {
            console.log(res)
        })
    }

    return (
        <>
            <TopNavBar></TopNavBar>
            <Box display="flex" flexDirection="column" height="100vh" p={5}>
                <Box marginBottom={5} textAlign={'right'}>
                    <Button onClick={onOpen}>Добавить продукт</Button>
                    <ProductAddModal data={selectedData} isOpen={isOpen} onClose={handleClose} />
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
                                        <Td>{product.bakeryType}</Td>
                                        <Td sx={{ width: '5%' }}>
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
                                                onClick={() => {
                                                    console.log(product)
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
