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
    clientId: number
    products: { productId: number | null; orderedQuantity: number | null }[]
}

const RequestAddModal = ({ isOpen, onClose, selectedData }: ClientAddModalProps) => {
    const { loading } = useNotify()
    const { data: clients } = useApi<ClientType[]>('client')
    const { data: products } = useApi<Product[]>('product')

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
            setValue('clientId', +selectedData.client.id)
            setValue('products', data)
        } else {
            reset()
        }
    }, [selectedData])

    const addRequest: SubmitHandler<FormData> = (formData) => {
        console.log(formData);
        
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
                                        <Box display="flex" gap="1rem" alignItems="center" key={index}>
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
