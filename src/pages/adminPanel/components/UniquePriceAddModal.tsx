import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Stack,
    ModalFooter,
    ModalOverlay,
    Button,
    Box,
    Text,
    Input,
    InputGroup,
    InputRightAddon,
    Select,
} from '@chakra-ui/react'
import { getAllProducts } from '@/utils/services/product.service'
import { useState, useEffect } from 'react'
import { getAllClients } from '@/utils/services/client.service'
import {
    createIndividualPrice,
    updateIndividualPrice,
} from '@/utils/services/individualPrices.service'

interface Client {
    id: string
    name: string
    surname: string
    contact: string
    telegrammId: string
    status: string
}

interface Product {
    id: string
    name: string
    price: string
    costPrice: string
    status: string
    bakingFacilityUnit: {
        facilityUnit: string
        id: string
    }
}

export interface UniquePrice {
    clientId: string
    clientName: string
    detail: {
        individualPriceId: string
        id: string
        name: string
        price: string
        date: Date
    }[]
}

interface UniquePriceAddModal {
    data: UniquePrice | undefined
    selectedRelease: string
    isOpen: boolean
    onClose: () => void
}

const UniquePriceAddModal = ({ data, selectedRelease, isOpen, onClose }: UniquePriceAddModal) => {
    const [products, setProducts] = useState<Product[]>([])
    const [selectedProduct, setSelectedProduct] = useState('')
    const [clientsData, setClientsData] = useState<Client[]>([])
    const [price, setPrice] = useState('')

    useEffect(() => {
        getAllProducts().then((responseData) => {
            setProducts(responseData)
            console.log(responseData)
        })
    }, [])

    useEffect(() => {
        getAllClients({ name: '', telegrammId: '', status: '' }).then((responseData) => {
            setClientsData(responseData)
            console.log(responseData)
        })
    }, [])

    const handleAddOrUpdate = () => {
        console.log(selectedRelease)
        console.log(data)

        let newData

        if (data == undefined) {
            newData = {
                clientId: clientsData?.find((client) => client.name == selectedRelease)?.id || '',
                detail: [
                    {
                        id: selectedProduct,
                        name: products.find((product) => product.id == selectedProduct)?.name || '',
                        price: price,
                    },
                ],
            }

            createIndividualPrice(newData).then((res) => {
                console.log(res)
            })
        } else {
            newData = {
                clientId: clientsData?.find((client) => client.name == data.clientName)?.id || '',
                detail: [
                    {
                        id: data.detail[0].id,
                        name:
                            products.find((product) => product.id == data.detail[0].id)?.name || '',
                        price: price,
                    },
                ],
            }

            updateIndividualPrice(newData.clientId, newData).then((res) => {
                console.log(res)
            })
        }

        console.log(newData)

        onClose()
    }

    const handleCancel = () => {
        onClose()
    }

    return (
        <>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
                <ModalContent>
                    <ModalHeader>{data ? 'Изменить цены' : 'Добавить цену продукта'}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={4}>
                            <Box display={'flex'} flexDirection={'column'} gap={'15px'}>
                                {data ? (
                                    <>
                                        <Box display={'flex'} gap={'10px'}>
                                            <Text>Реализатор:</Text>
                                            <Text fontWeight={600}>{data?.clientName}</Text>
                                        </Box>
                                        <Box display={'flex'} gap={'10px'}>
                                            <Text>Продукт: </Text>
                                            <Text fontWeight={600}>{data.detail[0].name}</Text>
                                        </Box>
                                        <InputGroup>
                                            <Input
                                                type="number"
                                                placeholder="Цена"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                            />
                                            <InputRightAddon>₸</InputRightAddon>
                                        </InputGroup>
                                    </>
                                ) : (
                                    <>
                                        <Box display={'flex'} gap={'10px'}>
                                            <Text>Реализатор:</Text>
                                            <Text fontWeight={600}>{selectedRelease}</Text>
                                        </Box>
                                        <Select
                                            variant="filled"
                                            placeholder="Продукт"
                                            value={selectedProduct}
                                            onChange={(e) => setSelectedProduct(e.target.value)}
                                        >
                                            {products?.map((product, index) => (
                                                <option key={index} value={product.id}>
                                                    {product.name}
                                                </option>
                                            ))}
                                        </Select>
                                        <InputGroup>
                                            <Input
                                                type="number"
                                                placeholder="Цена"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                            />
                                            <InputRightAddon>₸</InputRightAddon>
                                        </InputGroup>
                                    </>
                                )}
                            </Box>
                        </Stack>
                    </ModalBody>
                    <ModalFooter gap={3}>
                        <Button colorScheme="red" onClick={handleCancel}>
                            Закрыть
                        </Button>
                        <Button
                            colorScheme="purple"
                            onClick={handleAddOrUpdate}
                            // onClick={data ? updUser : addUser}
                        >
                            {data ? 'Изменить' : 'Добавить'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UniquePriceAddModal
