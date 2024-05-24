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
import { OverPriceInputs, OverPriceType } from '@/utils/types/overPrice.types'
import { ClientType } from '@/utils/types/client.type'
import { monthData } from '@/utils/constants/month.consts'

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

interface OverPriceAddModalProps {
    data: OverPriceType | undefined
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
}

const OverPriceAddModal = ({ data, isOpen, onClose, onSuccess }: OverPriceAddModalProps) => {

    const { success, error } = useNotify()

    const { data: clientData } = useApi<ClientType[]>('client')

    const {
        register,
        handleSubmit: handleSubmitForm,
        control,
        setValue,
        formState: { errors },
        reset,
    } = useForm<OverPriceInputs>()

    const sendData = (formData: OverPriceInputs) => {
        if (data) {
            updateOverprice(data.id, formData).then(() => {
                onSuccess()
                success('Успешно')
            })
        } else {
            createOverprice(formData)
                .then(() => {
                    onSuccess()
                    success('Успешно')
                })
                .catch((err) => {
                    console.error('Error:', err)
                    error(err.response.data.message)
                })
        }
        handleClose()
    }



    useEffect(() => {
        if (data) {
            setValue('clientId', data.clientId)
            setValue('month', data.month)
            setValue('year', data.year)
            setValue('price', data.price)
        }
    }, [data])

    const handleClose = () => {
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
                                rules={{ required: 'Поле является обязательным' }}
                                render={({ field }) => {
                                    const { onChange, value } = field
                                    return (
                                        <Select
                                            options={clientData}
                                            getOptionLabel={(option: ClientType) => option.name}
                                            getOptionValue={(option: ClientType) => `${option.id}`}
                                            value={clientData?.filter(
                                                (option: ClientType) => Number(option.id) == value,
                                            )}
                                            onChange={(selectedOption: ClientType | null) => {
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
                                rules={{ required: 'Поле является обязательным' }}
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
