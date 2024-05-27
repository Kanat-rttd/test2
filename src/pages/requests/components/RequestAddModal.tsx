import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Stack,
    ModalFooter,
    ModalOverlay,
    Input,
    Box,
    Select,
    FormControl,
    FormErrorMessage,
    Button,
} from '@chakra-ui/react'

// import { ChangeEvent, useEffect } from 'react'
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form'
import { OrderArrayType } from '@/utils/types/order.types'
import { createSale, updateSale } from '@/utils/services/sales.service'
import { ClientType } from '@/utils/types/client.type'
import { Product } from '@/utils/types/product.types'
import { useApi } from '@/utils/services/axios'
import { useNotify } from '@/utils/providers/ToastProvider'
import { useEffect } from 'react'
import { CloseIcon } from '@chakra-ui/icons'

interface ClientAddModalProps {
    isOpen: boolean
    quantity?: number
    onClose: () => void
    selectedData: OrderArrayType | undefined
}

type FormData = {
    clientId: string
    products: { productId: number | null; orderedQuantity: number | null }[]
}

const RequestAddModal = ({ isOpen, onClose, selectedData }: ClientAddModalProps) => {
    const { loading } = useNotify()
    const { data: clients } = useApi<ClientType[]>('client')
    const { data: products } = useApi<Product[]>('product')
    // const [formData, setFormData] = useState(modalData)
    // const [transformedData, setTransformedData] = useState<any[]>([])

    const {
        register,
        reset,
        setValue,
        control,
        setError,
        formState: { errors },
        handleSubmit: handleSubmitForm,
    } = useForm<FormData>()

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'products',
    })

    useEffect(() => {
        if (selectedData) {
            const data = selectedData?.orderDetails.map((order) => {
                return {
                    productId: +order.productId,
                    orderedQuantity: +order.orderedQuantity,
                }
            })
            setValue('clientId', selectedData.client.id)
            setValue('products', data)
        } else {
            reset()
        }
    }, [selectedData])

    // const handleChange =
    //     (index: number, field: string) =>
    //     ({ target }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    //         const { value } = target
    //         const newItems = [...formData.products]
    //         newItems[index] = { ...newItems[index], [field]: value }

    //         if (index === formData.products.length - 1) {
    //             newItems.push({ productId: '', orderedQuantity: ''})
    //         }

    //         setFormData({
    //             ...formData,
    //             products: newItems,
    //         })

    //         const _transformedData = newItems
    //             .filter((item) => item.productId !== '' && item.orderedQuantity !== '')
    //             .map((item) => ({
    //                 price: products?.find((product) => product.id === Number(item.productId))
    //                     ?.price,
    //                 productId: item.productId,
    //                 orderedQuantity: item.orderedQuantity,
    //             }))

    //         setTransformedData(_transformedData)
    //     }

    // useEffect(() => {
    //     if (selectedData) {
    //         const _transformedData = selectedData?.orderDetails
    //             .filter((item) => item.productId !== '' && item.orderedQuantity !== '')
    //             .map((item) => ({
    //                 price: products?.find((product) => product.id === Number(item.productId))
    //                     ?.price,
    //                 productId: item.productId,
    //                 orderedQuantity: item.orderedQuantity,
    //             }))

    //         console.log(_transformedData)
    //         setTransformedData(_transformedData)
    //     }
    // }, [selectedData])

    // const handleNameChange = (event: ChangeEvent<HTMLSelectElement>) => {
    //     const { value } = event.target
    //     setFormData({
    //         ...formData,
    //         name: value,
    //     })
    // }

    const addRequest: SubmitHandler<FormData> = (formData) => {
        try {
            const responsePromise: Promise<any> = selectedData
                ? updateSale(selectedData.id, formData)
                : createSale(formData)
            loading(responsePromise)
            responsePromise.then((res) => {
                console.log(res)
                onClose()
            })
        } catch (error: any) {
            setError('root', {
                message: error.response.data.message || 'Ошибка',
            })
        }
    }

    const handleModalClose = () => {
        onClose()
        reset()
    }

    return (
        <Modal isCentered isOpen={isOpen} onClose={handleModalClose}>
            <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
            <ModalContent>
                <ModalHeader>{selectedData ? 'Редактировать' : 'Добавить'} заказ</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={4}>
                        <form
                            onSubmit={handleSubmitForm(addRequest)}
                            style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
                        >
                            <FormControl id="type" isRequired isInvalid={!!errors.clientId}>
                                <Select
                                    {...register('clientId', {
                                        required: 'Поле является обязательным',
                                    })}
                                    variant="filled"
                                    placeholder="Имя клиента"
                                    name="name"
                                >
                                    {clients?.map((client, index) => (
                                        <option key={index} value={client.id}>
                                            {client.name}
                                        </option>
                                    ))}
                                </Select>
                                <FormErrorMessage>{errors.clientId?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl
                                isRequired
                                gap="1rem"
                                display="flex"
                                flexDirection="column"
                            >
                                {fields.map((_, index) => {
                                    return (
                                        <Box>
                                            <Select
                                                {...register(`products.${index}.productId`, {
                                                    required: 'Поле является обязательным',
                                                })}
                                                variant="filled"
                                                placeholder="Вид хлеба"
                                            >
                                                {products?.map((product, index) => (
                                                    <option key={index} value={product.id}>
                                                        {product.name}
                                                    </option>
                                                ))}
                                            </Select>

                                            <Input
                                                {...register(`products.${index}.orderedQuantity`, {
                                                    required: 'Поле является обязательным',
                                                })}
                                                placeholder="Количество"
                                            />
                                            <CloseIcon
                                                cursor="pointer"
                                                onClick={() => index > 0 && remove(index)}
                                            />
                                        </Box>
                                    )
                                })}
                                <Button
                                    onClick={() => {
                                        append({ productId: null, orderedQuantity: null })
                                    }}
                                >
                                    Добавить
                                </Button>
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
                                    value={selectedData ? 'Редактировать' : 'Добавить'}
                                />
                            </Box>
                        </form>
                    </Stack>
                </ModalBody>
                <ModalFooter display={'flex'} alignSelf={'center'} gap={5}></ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default RequestAddModal
