import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
} from '@chakra-ui/react'
import { useEffect } from 'react'

import { createDispatch, updateDispatchQuantity } from '@/utils/services/dispatch.service'
import { useNotify } from '@/utils/providers/ToastProvider'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { ClientType } from '@/utils/types/client.type'
import { useApi } from '@/utils/services/axios'
import { DispatchType } from '@/utils/types/dispatch.types'
import { CloseIcon } from '@chakra-ui/icons'
import { Product } from '@/utils/types/product.types'

interface DistributionModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
    status: string
    data: DispatchType | undefined
}
// type ProductType = {
//     productId: number | null
//     quantity: number | null
// }
type FormType = {
    clientId: number
    products: {
        productId: number | null
        quantity: number | null
    }[]
}

const DistributionModal: React.FC<DistributionModalProps> = ({
    data,
    isOpen,
    onClose,
    onSuccess,
    status,
}) => {
    const { loading } = useNotify()
    const { data: clientsData } = useApi<ClientType[]>('client?status=Активный')
    const { data: products } = useApi<Product[]>('product?status=Активный')

    const {
        register,
        reset,
        setValue,
        control,
        setError,
        formState: { errors },
        handleSubmit: handleSubmitForm,
    } = useForm<FormType>()

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'products',
    })
    
    useEffect(() => {
        if (data) {
            const _data = data.goodsDispatchDetails.map((order) => {
                return {
                    productId: Number(order.productId),
                    quantity: Number(order.quantity),
                }
            })
            setValue('clientId', Number(data.client.id))
            setValue('products', _data)
        } else {
            reset()
        }
    }, [data])

    const handleConfirm: SubmitHandler<FormType> = (formData) => {
        const createData = {
            clientId: formData.clientId,
            products: formData.products.map((product) => ({
                ...product,
                productPrice: products?.find((item) => item.id == product.productId)?.price,
            })),
            dispatch: status,
        }

        try {
            const responsePromise: Promise<any> = data
                ? updateDispatchQuantity(data.id, formData)
                : createDispatch(createData)
            loading(responsePromise)
            responsePromise.then((res) => {
                console.log(res)
                reset()
                onClose()
                onSuccess()
            })
        } catch (error: any) {
            setError('root', {
                message: error.response.data.message || 'Ошибка',
            })
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{status == '0' ? 'Выдача' : 'Возврат'} продукции</ModalHeader>
                <ModalCloseButton />
                <ModalBody display={'flex'} gap={'10px'} flexDirection={'column'}>
                    <form
                        onSubmit={handleSubmitForm(handleConfirm)}
                        style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
                    >
                        <FormControl id="type" isRequired isInvalid={!!errors.clientId}>
                            <Select
                                {...register('clientId', {
                                    required: 'Поле является обязательным',
                                })}
                                required
                                placeholder="Выберите получателя"
                                width={'100%'}
                            >
                                {clientsData?.map((client, index) => {
                                    return (
                                        <option key={index} value={Number(client.id)}>
                                            {client.name}
                                        </option>
                                    )
                                })}
                            </Select>
                            <FormErrorMessage>{errors.clientId?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isRequired gap="1rem" display="flex" flexDirection="column">
                            {fields.map((_, index) => {
                                return (
                                    <Box display="flex" gap="1rem" alignItems="center" key={index}>
                                        <Select
                                            {...register(`products.${index}.productId`, {
                                                required: 'Поле является обязательным',
                                            })}
                                            variant="filled"
                                            placeholder="Вид хлеба"
                                            defaultValue={data && data?.goodsDispatchDetails[index].productId}
                                        >
                                            {products?.map((product) => (
                                                <option key={product.name} value={product.id}>
                                                    {product.name}
                                                </option>
                                            ))}
                                        </Select>

                                        <Input
                                            {...register(`products.${index}.quantity`, {
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
                                    append({ productId: null, quantity: null })
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
                                value={'Подтвердить'}
                            />
                        </Box>
                    </form>
                </ModalBody>

                <ModalFooter></ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default DistributionModal
