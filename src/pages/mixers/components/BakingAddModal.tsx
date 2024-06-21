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
    InputGroup,
    InputRightAddon,
} from '@chakra-ui/react'

import { createBaking, updateBaking } from '@/utils/services/baking.service'
import { useEffect } from 'react'
import { useApi } from '@/utils/services/axios'
import { useForm } from 'react-hook-form'
import { useNotify } from '@/utils/providers/ToastProvider'
import { BakingDataType } from '@/utils/types/baking.types'
import dayjs from 'dayjs'

interface ClientAddModalProps {
    data?: BakingDataType | null
    isOpen: boolean
    quantity?: number
    onClose: () => void
    onSuccess: () => void
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
    } = useForm<BakingDataType>()

    const { data: products } = useApi<{ id: string; name: string }[]>('product?status=Активный')

    useEffect(() => {
        if (data) {
            Object.entries(data).forEach(([key, value]) => {
                setValue(key as keyof BakingDataType, value)
            })
            setValue('dateTime', dayjs(data.dateTime).format('YYYY-MM-DD HH:mm'))
        } else {
            reset()
        }
    }, [data, isOpen, reset])

    const sendData = (formData: BakingDataType) => {
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
                                <FormControl isInvalid={!!errors.breadType} isRequired>
                                    <FormLabel fontWeight={'bold'}>Вид хлеба</FormLabel>
                                    <Select
                                        {...register('breadType', {
                                            required: 'Поле является обязательным',
                                        })}
                                        variant="filled"
                                        placeholder=""
                                        defaultValue={data ? data.product?.id : ''}
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
                                <FormControl isInvalid={!!errors.flour} isRequired>
                                    <FormLabel fontWeight={'bold'}>Мука</FormLabel>
                                    <InputGroup>
                                        <Input
                                            {...register('flour', {
                                                required: 'Поле является обязательным',
                                            })}
                                            type="number"
                                            step="any"
                                        />
                                        <InputRightAddon
                                            w={'15%'}
                                            display={'flex'}
                                            justifyContent={'center'}
                                        >
                                            кг
                                        </InputRightAddon>
                                    </InputGroup>
                                    <FormErrorMessage>{errors.flour?.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.salt} isRequired>
                                    <FormLabel fontWeight={'bold'}>Соль</FormLabel>
                                    <InputGroup>
                                        <Input
                                            {...register('salt', {
                                                required: 'Поле является обязательным',
                                            })}
                                            type="number"
                                            step="any"
                                        />
                                        <InputRightAddon
                                            w={'15%'}
                                            display={'flex'}
                                            justifyContent={'center'}
                                        >
                                            кг
                                        </InputRightAddon>
                                    </InputGroup>
                                    <FormErrorMessage>{errors.salt?.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.yeast} isRequired>
                                    <FormLabel fontWeight={'bold'}>Дрожжи</FormLabel>
                                    <InputGroup>
                                        <Input
                                            {...register('yeast', {
                                                required: 'Поле является обязательным',
                                            })}
                                            type="number"
                                            step="any"
                                        />
                                        <InputRightAddon
                                            w={'15%'}
                                            display={'flex'}
                                            justifyContent={'center'}
                                        >
                                            кг
                                        </InputRightAddon>
                                    </InputGroup>
                                    <FormErrorMessage>{errors.yeast?.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.malt} isRequired>
                                    <FormLabel fontWeight={'bold'}>Солод</FormLabel>
                                    <InputGroup>
                                        <Input
                                            {...register('malt', {
                                                required: 'Поле является обязательным',
                                            })}
                                            type="number"
                                            step="any"
                                        />
                                        <InputRightAddon
                                            w={'15%'}
                                            display={'flex'}
                                            justifyContent={'center'}
                                        >
                                            кг
                                        </InputRightAddon>
                                    </InputGroup>
                                    <FormErrorMessage>{errors.malt?.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.butter} isRequired>
                                    <FormLabel fontWeight={'bold'}>Масло</FormLabel>
                                    <InputGroup>
                                        <Input
                                            {...register('butter', {
                                                required: 'Поле является обязательным',
                                            })}
                                            type="number"
                                            step="any"
                                        />
                                        <InputRightAddon
                                            w={'15%'}
                                            display={'flex'}
                                            justifyContent={'center'}
                                        >
                                            кг
                                        </InputRightAddon>
                                    </InputGroup>
                                    <FormErrorMessage>{errors.butter?.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.temperature} isRequired>
                                    <FormLabel fontWeight={'bold'}>T</FormLabel>
                                    <Input
                                        {...register('temperature', {
                                            required: 'Поле является обязательным',
                                        })}
                                        type="number"
                                        step="any"
                                    />
                                    <FormErrorMessage>
                                        {errors.temperature?.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.dateTime} isRequired>
                                    <FormLabel fontWeight={'bold'}>Дата и время</FormLabel>
                                    <Input
                                        {...register('dateTime', {
                                            required: 'Поле является обязательным',
                                        })}
                                        style={{
                                            width: '100%',
                                            height: '42px',
                                            border: '1px solid #e3e3e3',
                                            borderRadius: '5px',
                                            padding: '0 15px',
                                        }}
                                        type="datetime-local"
                                        defaultValue={data ? dayjs(data.dateTime).format('YYYY-MM-DD HH:mm') : dayjs().format('YYYY-MM-DD HH:mm')}
                                    />
                                    <FormErrorMessage>{errors.dateTime?.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.output} isRequired>
                                    <FormLabel fontWeight={'bold'}>Выход</FormLabel>
                                    <Input
                                        {...register('output', {
                                            required: 'Поле является обязательным',
                                        })}
                                        type="number"
                                        step="any"
                                    />
                                    <FormErrorMessage>{errors.output?.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.defective} isRequired>
                                    <FormLabel fontWeight={'bold'}>Брак</FormLabel>
                                    <Input
                                        {...register('defective', {
                                            required: 'Поле является обязательным',
                                        })}
                                        type="number"
                                        step="any"
                                    />
                                    <FormErrorMessage>{errors.defective?.message}</FormErrorMessage>
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
                <ModalFooter display={'flex'} alignSelf={'center'} gap={5}></ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default BakingAddModal
