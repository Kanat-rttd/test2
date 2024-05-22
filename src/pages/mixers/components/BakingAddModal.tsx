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
    FormLabel,
} from '@chakra-ui/react'

import { createBaking } from '@/utils/services/baking.service'
import { useEffect } from 'react'
import { useApi } from '@/utils/services/axios'
import { useForm } from 'react-hook-form'
import { useNotify } from '@/utils/providers/ToastProvider'

interface ClientAddModalProps {
    data?: bakingsData | null
    isOpen: boolean
    quantity?: number
    onClose: () => void
    onSuccess: () => void
}

interface bakingsData {
    breadType: string
    flour: string
    salt: string
    yeast: string
    malt: string
    butter: string
    temperature: string
    time: string
    output: string
    product?: {
        name: string
        id: string
    }
}

const BakingAddModal = ({ data, isOpen, onClose, onSuccess }: ClientAddModalProps) => {
    const { loading } = useNotify()
    const {
        register,
        handleSubmit: handleSubmitForm,
        setValue,
        setError,
        formState: { errors },
        reset,
    } = useForm<bakingsData>()

    useEffect(() => {
        if (data) {
            Object.entries(data).forEach(([key, value]) => {
                setValue(key as keyof bakingsData, value)
            })
        } else {
            reset()
        }
    }, [data, isOpen, reset])


    const { data: products } = useApi<{ id: string; name: string }[]>('product')

    const sendData = (formData: bakingsData) => {
        const responsePromise: Promise<any> = data
            ? updateBaking(data.id, formData)
            : createBaking(formData)

        loading(responsePromise)

        responsePromise
            .then(() => {
                reset()
                onSuccess()
                onClose()
            })
            .catch((error) => {
                console.log(error)
                setError(error.response.data.field, {
                    message: error.response.data.message || 'Ошибка',
                })
            })
    }

    const handleModalClose = () => {
        reset()
        onClose()
    }

    return (
        <Modal isCentered isOpen={isOpen} onClose={handleModalClose}>
            <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
            <ModalContent>
                <ModalHeader>{'Добавить'} заказ</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={4}>
                        <Box>
                            <form
                                onSubmit={handleSubmitForm(sendData)}
                                style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
                            >
                                <FormControl isInvalid={!!errors.breadType}>
                                    <FormLabel fontWeight={'bold'}>Вид хлеба</FormLabel>
                                    <Select
                                        {...register('breadType', {
                                            required: 'Поле является обязательным',
                                        })}
                                        variant="filled"
                                        placeholder=""
                                        name="breadType"
                                    >
                                        <option disabled value="">
                                            Выберите хлеб
                                        </option>
                                        {products?.map((product) => (
                                            <option key={product.id} value={product.id}>
                                                {product.name}
                                            </option>
                                        ))}
                                    </Select>
                                    <FormErrorMessage>{errors.breadType?.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.flour}>
                                    <FormLabel fontWeight={'bold'}>Мука</FormLabel>
                                    <Input
                                        {...register('flour', {
                                            required: 'Поле является обязательным',
                                        })}
                                        type="number"
                                        name="flour"
                                        placeholder=""
                                    />
                                    <FormErrorMessage>{errors.flour?.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.salt}>
                                    <FormLabel fontWeight={'bold'}>Соль</FormLabel>
                                    <Input
                                        {...register('salt', {
                                            required: 'Поле является обязательным',
                                        })}
                                        type="number"
                                        name="salt"
                                        placeholder=""
                                    />
                                    <FormErrorMessage>{errors.salt?.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.yeast}>
                                    <FormLabel fontWeight={'bold'}>Дрожжи</FormLabel>
                                    <Input
                                        {...register('yeast', {
                                            required: 'Поле является обязательным',
                                        })}
                                        type="number"
                                        name="yeast"
                                        placeholder=""
                                    />
                                    <FormErrorMessage>{errors.yeast?.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.malt}>
                                    <FormLabel fontWeight={'bold'}>Солод</FormLabel>
                                    <Input
                                        {...register('malt', {
                                            required: 'Поле является обязательным',
                                        })}
                                        type="number"
                                        name="malt"
                                        placeholder=""
                                    />
                                    <FormErrorMessage>{errors.malt?.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.butter}>
                                    <FormLabel fontWeight={'bold'}>Масло</FormLabel>
                                    <Input
                                        {...register('butter', {
                                            required: 'Поле является обязательным',
                                        })}
                                        type="number"
                                        name="butter"
                                        placeholder=""
                                    />
                                    <FormErrorMessage>{errors.butter?.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.temperature}>
                                    <FormLabel fontWeight={'bold'}>T</FormLabel>
                                    <Input
                                        {...register('temperature', {
                                            required: 'Поле является обязательным',
                                        })}
                                        type="number"
                                        name="temperature"
                                        placeholder=""
                                    />
                                    <FormErrorMessage>
                                        {errors.temperature?.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.time}>
                                    <FormLabel fontWeight={'bold'}>Время</FormLabel>
                                    <Input
                                        {...register('time', {
                                            required: 'Поле является обязательным',
                                        })}
                                        type="time"
                                        name="time"
                                        placeholder=""
                                    />
                                    <FormErrorMessage>{errors.time?.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.output}>
                                    <FormLabel fontWeight={'bold'}>Выход</FormLabel>
                                    <Input
                                        {...register('output', {
                                            required: 'Поле является обязательным',
                                        })}
                                        type="number"
                                        name="output"
                                        placeholder=""
                                    />
                                    <FormErrorMessage>{errors.output?.message}</FormErrorMessage>
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
                                    />
                                </Box>
                            </form>
                        </Box>
                    </Stack>
                </ModalBody>
                <ModalFooter display={'flex'} alignSelf={'center'} gap={5}>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default BakingAddModal
