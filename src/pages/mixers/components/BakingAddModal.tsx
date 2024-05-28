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

import { createBaking, updateBaking } from '@/utils/services/baking.service'
import { useEffect, useState } from 'react'
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

    const { data: products } = useApi<{ id: string; name: string }[]>('product')
    const [startDate, setStartDate] = useState<Date>(new Date())
    const [endDate, setEndDate] = useState<Date>(new Date())

    useEffect(() => {
        if (data) {
            Object.entries(data).forEach(([key, value]) => {
                setValue(key as keyof BakingDataType, value)
            })
        } else {
            reset()
        }
    }, [data, isOpen, reset])

    useEffect(() => {
        getStartEndDates()
    }, [data])

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

    const getStartEndDates = () => {
        if (data && data.date) {
            const { date } = data
            const parsedDate = dayjs(date, 'YYYY-MM-DD', true)

            if (parsedDate.isValid()) {
                const startDate = parsedDate.subtract(2, 'day').toDate()
                const endDate = parsedDate.add(4, 'day').toDate()
                setStartDate(startDate)
                setEndDate(endDate)
            } else {
                console.error('Invalid date format:', date)
            }
        } else {
            const startDate = dayjs().subtract(3, 'day').toDate()
            const endDate = dayjs().add(3, 'day').toDate()
            setStartDate(startDate)
            setEndDate(endDate)
        }
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
                                    <Input
                                        {...register('flour', {
                                            required: 'Поле является обязательным',
                                        })}
                                        type="number"
                                        step="any"
                                    />
                                    <FormErrorMessage>{errors.flour?.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.salt} isRequired>
                                    <FormLabel fontWeight={'bold'}>Соль</FormLabel>
                                    <Input
                                        {...register('salt', {
                                            required: 'Поле является обязательным',
                                        })}
                                        type="number"
                                        step="any"
                                    />
                                    <FormErrorMessage>{errors.salt?.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.yeast} isRequired>
                                    <FormLabel fontWeight={'bold'}>Дрожжи</FormLabel>
                                    <Input
                                        {...register('yeast', {
                                            required: 'Поле является обязательным',
                                        })}
                                        type="number"
                                        step="any"
                                    />
                                    <FormErrorMessage>{errors.yeast?.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.malt} isRequired>
                                    <FormLabel fontWeight={'bold'}>Солод</FormLabel>
                                    <Input
                                        {...register('malt', {
                                            required: 'Поле является обязательным',
                                        })}
                                        type="number"
                                        step="any"
                                    />
                                    <FormErrorMessage>{errors.malt?.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.butter} isRequired>
                                    <FormLabel fontWeight={'bold'}>Масло</FormLabel>
                                    <Input
                                        {...register('butter', {
                                            required: 'Поле является обязательным',
                                        })}
                                        type="number"
                                        step="any"
                                    />
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
                                <FormControl isInvalid={!!errors.date} isRequired>
                                    <FormLabel fontWeight={'bold'}>Дата</FormLabel>
                                    <Input
                                        {...register('date', {
                                            required: 'Поле является обязательным',
                                        })}
                                        autoComplete="off"
                                        placeholder="Дата *"
                                        type="date"
                                        defaultValue={new Date().toISOString().split('T')[0]}
                                        min={startDate.toISOString().split('T')[0]}
                                        max={endDate.toISOString().split('T')[0]}
                                    />
                                    <FormErrorMessage>{errors.date?.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.time} isRequired>
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
