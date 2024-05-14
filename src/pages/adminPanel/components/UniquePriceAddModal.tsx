import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Stack,
    ModalFooter,
    ModalOverlay,
    Box,
    Text,
    Input,
    InputGroup,
    InputRightAddon,
    Select,
    FormControl,
    FormErrorMessage,
} from '@chakra-ui/react'
import { getAllProducts } from '@/utils/services/product.service'
import { useState, useEffect, useMemo } from 'react'
import { getAllClients } from '@/utils/services/client.service'
import {
    createIndividualPrice,
    updateIndividualPrice,
} from '@/utils/services/individualPrices.service'
import { useApi } from '@/utils/services/axios'
import { useNotify } from '@/utils/providers/ToastProvider'
import { useForm } from 'react-hook-form'

interface Client {
    id: string
    name: string
    surname: string
    contact: string
    telegrammId: string
    status: string
}

interface individualPrice {
    clientId: string
    clientName: string
    detail: [
        {
            individualPriceId: string
            id: string
            name: string
            price: string
            date: Date
        },
    ]
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
    detail: Detail[]
}

type Detail = {
    individualPriceId: string
    id: string
    name: string
    price: string
    date: Date
}

interface UniquePriceAddModal {
    data: UniquePrice | undefined
    selectedRelease: string
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
}

const UniquePriceAddModal = ({
    data,
    selectedRelease,
    isOpen,
    onClose,
    onSuccess,
}: UniquePriceAddModal) => {
    const { loading } = useNotify()
    const { data: individualPrices } = useApi<individualPrice[]>('inPrice')
    const [products, setProducts] = useState<Product[]>([])
    // const [selectedProduct, setSelectedProduct] = useState('')
    const [clientsData, setClientsData] = useState<Client[]>([])

    const {
        register,
        handleSubmit: handleSubmitForm,
        setError,
        setValue,
        formState: { errors },
        reset,
    } = useForm<Detail>()

    useEffect(() => {
        getAllProducts().then((responseData) => {
            setProducts(responseData)
        })
    }, [])
    useEffect(() => {
        console.log(data)

        if (data) {
            Object.entries(data).forEach(([key, value]) => {
                setValue(key as keyof Detail, value)
            })
            // setSelectedProduct(String(data.detail[0].id))
            setValue('name', String(data.detail[0].id))
            setValue('price', data.detail[0].price)
        } else {
            reset()
        }
    }, [data])

    useEffect(() => {
        getAllClients({ name: '', telegrammId: '', status: '' }).then((responseData) => {
            setClientsData(responseData)
        })
    }, [])

    const handleAddOrUpdate = (formData: Detail) => {
        try {
            let newData

            if (data == undefined) {
                newData = {
                    clientId:
                        clientsData?.find((client) => client.name == selectedRelease)?.id || '',
                    detail: [
                        {
                            id: formData.name,
                            name:
                                products.find((product) => product.id == formData.name)?.name || '',
                            price: formData.price,
                        },
                    ],
                }
                console.log(formData.id)

                const responsePromise: Promise<any> = createIndividualPrice(newData)
                loading(responsePromise)
                responsePromise.then(() => {
                    reset()
                    handleCancel()
                    onSuccess()
                })
                reset()
            } else {
                newData = {
                    clientId:
                        clientsData?.find((client) => client.name == data.clientName)?.id || '',
                    detail: [
                        {
                            id: data.detail[0].id,
                            name:
                                products.find((product) => product.id == data.detail[0].id)?.name ||
                                '',
                            price: formData.price,
                        },
                    ],
                }
                console.log(newData)
                const responsePromise: Promise<any> = updateIndividualPrice(
                    newData.clientId,
                    newData,
                )
                loading(responsePromise)
                responsePromise.then(() => {
                    reset()
                    handleCancel()
                    onSuccess()
                })
                reset()
            }
        } catch (error: any) {
            setError('root', {
                message: error.response.data.message || 'Ошибка',
            })
        }
    }

    const handleCancel = () => {
        onClose()
    }

    const filteredProducts = useMemo(() => {
        return products?.filter((product) => {
            if (individualPrices) {
                return individualPrices.find((client) => {
                    if (client.clientName === selectedRelease) {
                        if (!client.detail.length) {
                            return true
                        }
                        return !client.detail.some((detail) => detail.id === product.id)
                    }
                })
            }
            return false
        })
    }, [products, individualPrices, selectedRelease])

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
                                <form
                                    onSubmit={handleSubmitForm(handleAddOrUpdate)}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '15px',
                                    }}
                                >
                                    <Box display={'flex'} gap={'10px'}>
                                        <Text>Реализатор:</Text>
                                        <Text fontWeight={600}>{selectedRelease}</Text>
                                    </Box>
                                    <FormControl isInvalid={!!errors.name}>
                                        <Select
                                            {...register('name', {
                                                required: 'Поле является обязательным',
                                            })}
                                            variant="filled"
                                            placeholder="Продукт"
                                            isDisabled={!!data}
                                        >
                                            {(data ? products : filteredProducts).map((product) => (
                                                <option key={product.id} value={product.id}>
                                                    {product.name}
                                                </option>
                                            ))}
                                        </Select>
                                        <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl isInvalid={!!errors.price}>
                                        <InputGroup>
                                            <Input
                                                {...register('price', {
                                                    required: 'Поле является обязательным',
                                                })}
                                                type="number"
                                                placeholder="Цена"
                                            />
                                            <InputRightAddon>₸</InputRightAddon>
                                        </InputGroup>
                                        <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
                                    </FormControl>

                                    <Box
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            marginTop: '10px',
                                        }}
                                    >
                                        <Input
                                            width={'40%'}
                                            type="submit"
                                            bg="purple.500"
                                            color="white"
                                            cursor="pointer"
                                            value={data ? 'Редактировать' : 'Добавить'}
                                            onSubmit={() => console.log('test')}
                                        />
                                    </Box>
                                </form>
                            </Box>
                        </Stack>
                    </ModalBody>
                    <ModalFooter gap={3}>
                        {/* <Button colorScheme="red" onClick={handleCancel}>
                            Закрыть
                        </Button>
                        <Button
                            colorScheme="purple"
                            onClick={handleAddOrUpdate}
                            // onClick={data ? updUser : addUser}
                        >
                            {data ? 'Изменить' : 'Добавить'}
                        </Button> */}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UniquePriceAddModal
