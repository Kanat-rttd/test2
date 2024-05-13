import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    ModalOverlay,
    Button,
    InputGroup,
    Input,
    FormControl,
    FormErrorMessage,
    InputRightAddon,
} from '@chakra-ui/react'

import Select from 'react-select'
import { Controller, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useApi } from '@/utils/services/axios'
import { createOverprice, updateOverprice } from '@/utils/services/overprice.service'
import { useNotify } from '@/utils/providers/ToastProvider'

interface OverPriceInputs {
    clientId: number
    month: string
    year: string
    price: string
}

const defaultValues = {
    clientId: 0,
    month: '',
    year: '',
    price: '',
}

interface months {
    id: number
    name: string
}

interface OverPrice {
    id: number
    price: string
    clientId: number
    month: string
    year: string
    isDeleted: number
    client: {
        id: number
        name: string
    }
}

interface Client {
    id: string
    name: string
    surname: string
    contact: string
    telegrammId: string
    status: string
}

interface OverPriceAddModalProps {
    data: OverPrice | undefined
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
}

const OverPriceAddModal = ({ data, isOpen, onClose, onSuccess }: OverPriceAddModalProps) => {
    console.log(data)

    const { success, error } = useNotify()
    // console.log(data)

    const { data: clientData } = useApi<Client[]>('client')

    const {
        register,
        handleSubmit: handleSubmitForm,
        control,
        setValue,
        formState: { errors },
        reset,
    } = useForm<OverPriceInputs>()

    const sendData = (formData: OverPriceInputs) => {
        console.log(formData)
        if (data) {
            updateOverprice(data.id, formData).then((res) => {
                console.log(res)
                onSuccess()
                success('Успешно')
            })
        } else {
            createOverprice(formData)
                .then((res) => {
                    console.log(res)
                    onSuccess()
                    success('Успешно')
                })
                .catch((err) => {
                    console.error('Error:', err)
                    error(err.response.data.message)
                })
        }
        handleClose()
        // reset(defaultValues)
    }

    const monthData = [
        { id: 1, name: 'Январь' },
        { id: 2, name: 'Февраль' },
        { id: 3, name: 'Март' },
        { id: 4, name: 'Апрель' },
        { id: 5, name: 'Май' },
        { id: 6, name: 'Июнь' },
        { id: 7, name: 'Июль' },
        { id: 8, name: 'Август' },
        { id: 9, name: 'Сентябрь' },
        { id: 10, name: 'Октябрь' },
        { id: 11, name: 'Ноябрь' },
        { id: 12, name: 'Декабрь' },
    ]

    useEffect(() => {
        if (data) {
            setValue('clientId', data.clientId)
            setValue('month', data.month)
            setValue('year', data.year)
            setValue('price', data.price)
        }
    }, [data])

    const handleClose = () => {
        console.log('123')
        reset(defaultValues)
        onClose()
    }

    return (
        <>
            <Modal isCentered isOpen={isOpen} onClose={handleClose}>
                <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
                <ModalContent>
                    <ModalHeader>{data ? 'Редактировать' : 'Добавить'} Сверху</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display={'flex'} flexDirection={'column'} gap={3}>
                        <FormControl isInvalid={!!errors.clientId}>
                            <Controller
                                name="clientId"
                                control={control}
                                rules={{ required: 'Поля является обязательным' }}
                                render={({ field }) => {
                                    const { onChange, value } = field
                                    return (
                                        <Select
                                            options={clientData}
                                            getOptionLabel={(option: Client) => option.name}
                                            getOptionValue={(option: Client) => `${option.id}`}
                                            value={clientData?.filter(
                                                (option: Client) => Number(option.id) == value,
                                            )}
                                            onChange={(selectedOption: Client | null) => {
                                                if (selectedOption) {
                                                    onChange(selectedOption.id)
                                                }
                                            }}
                                            placeholder="Реализатор *"
                                            isClearable
                                            isSearchable
                                        />
                                    )
                                }}
                            />
                            <FormErrorMessage>{errors.clientId?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors.month}>
                            <Controller
                                name="month"
                                control={control}
                                rules={{ required: 'Поля является обязательным' }}
                                render={({ field }) => {
                                    const { onChange, value } = field
                                    return (
                                        <Select
                                            options={monthData}
                                            getOptionLabel={(option: months) => option.name}
                                            getOptionValue={(option: months) => `${option.id}`}
                                            value={monthData?.filter(
                                                (option: months) => option.id == Number(value),
                                            )}
                                            onChange={(selectedOption: months | null) => {
                                                if (selectedOption) {
                                                    onChange(selectedOption.id)
                                                }
                                            }}
                                            placeholder="Месяц *"
                                            isClearable
                                            isSearchable
                                        />
                                    )
                                }}
                            />
                            <FormErrorMessage>{errors.month?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors.year}>
                            <InputGroup>
                                <Input
                                    {...register('year', {
                                        required: 'Поле является обязательным',
                                        minLength: {
                                            value: 4,
                                            message: 'Некорректный год.',
                                        },
                                        maxLength: {
                                            value: 4,
                                            message: 'Некорректный год.',
                                        },
                                    })}
                                    autoComplete="off"
                                    placeholder="Год *"
                                    type="number"
                                />
                            </InputGroup>
                            <FormErrorMessage>{errors.year?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors.price}>
                            <InputGroup>
                                <Input
                                    {...register('price', {
                                        required: 'Поле является обязательным',
                                    })}
                                    autoComplete="off"
                                    placeholder="Сверху *"
                                    type="number"
                                />
                                <InputRightAddon>тг</InputRightAddon>
                            </InputGroup>
                            <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter gap={3}>
                        <Button onClick={handleClose} colorScheme="red">
                            Отмена
                        </Button>
                        <Button colorScheme="purple" onClick={handleSubmitForm(sendData)}>
                            {data ? 'Редактировать' : 'Добавить'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default OverPriceAddModal
