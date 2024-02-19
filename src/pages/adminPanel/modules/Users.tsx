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
import UserAddModal from '../components/UserAddModal'
import { useEffect, useState } from 'react'
import { getAllUsers } from '../../../utils/services/user.service'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'

interface Users {
    id: number
    name: string
    pass: string
    phone: string
    userClass: string
}

const AdminPanel = () => {
    const { onOpen, onClose, isOpen } = useDisclosure()
    const [selectedData, setSelectedData] = useState<Users | undefined>(undefined)
    const [data, setData] = useState<Users[]>([])

    const handleClose = () => {
        onClose()
        setSelectedData(undefined)
        //console.log(selectedData)
    }

    useEffect(() => {
        getAllUsers().then((responseData) => {
            setData(responseData)
        })
    }, [])

    // const delProduct = (data: ProductList) => {
    //     deleteProduct(data.id).then((res) => {
    //         console.log(res)
    //     })
    // }

    return (
        <>
            <TopNavBar></TopNavBar>
            <Box display="flex" flexDirection="column" height="100vh" p={5}>
                <Box marginBottom={5} textAlign={'right'}>
                    <Button onClick={onOpen}>Добавить пользователя</Button>
                    <UserAddModal data={selectedData} isOpen={isOpen} onClose={handleClose} />
                </Box>
                <TableContainer maxWidth={'100%'} width={'100%'}>
                    <Table variant="striped" colorScheme="teal" size="lg" width={'100%'}>
                        <Thead>
                            <Tr>
                                <Th p={0}>Имя</Th>
                                <Th p={0}>Класс</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map((user, index) => {
                                return (
                                    <Tr key={index}>
                                        <Td>{user.name}</Td>
                                        <Td>{user.userClass}</Td>
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
                                                onClick={() => {
                                                    setData(
                                                        data.filter((elem) => elem.id !== user.id),
                                                    )
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
