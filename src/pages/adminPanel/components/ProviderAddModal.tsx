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
} from '@chakra-ui/react'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'
import { useApi } from '@/utils/services/axios'
import { useEffect } from 'react'
import { createProviderGoods } from '@/utils/services/providerGoods.service'

export type ProviderInputs = {
    id: number
    provider: number
    goods: string
    unitOfMeasure: string
    bakery: { value: number; label: string }[]
    status: string
}

interface status {
    id: number
    name: string
}

interface ProviderGoods {
    id: number
    providerId: number
    goods: string
    unitOfMeasure: string
    place: string
    status: string
    provider: {
        id: number
        name: string
    }
}

interface Providers {
    id: number
    name: string
}

type ModalProps = {
    isOpen: boolean
    onClose: () => void
    selectedData: ProviderGoods | undefined
}

const defaultValues = {
    provider: 0,
    goods: '',
    unitOfMeasure: '',
    bakery: [{ value: 0, label: '' }],
    status: '',
}

const ProviderAddModal = ({ isOpen, onClose, selectedData }: ModalProps) => {
    const { data: providersData } = useApi<Providers[]>('providers')
    console.log(providersData)

    const {
        register,
        handleSubmit: handleSubmitForm,
        control,
        formState: { errors },
        setValue,
        reset,
    } = useForm<ProviderInputs>()

    useEffect(() => {
        if (selectedData) {
            setValue('provider', selectedData.provider.id)
            setValue('goods', selectedData.goods)
            setValue('status', selectedData.status)
            setValue('unitOfMeasure', selectedData.unitOfMeasure)

            const selectedBakery = bakery.find((b) => b.label == selectedData.place)
            setValue('bakery', selectedBakery ? [selectedBakery] : [])
        }
    }, [selectedData])

    const bakery = [
        { value: 1, label: 'Батонный' },
        { value: 2, label: 'Заводской' },
    ]

    const status = [
        { id: 1, name: 'Активный' },
        { id: 2, name: 'Неактивный' },
    ]

    const sendData = (formData: ProviderInputs) => {
        console.log(formData)
        createProviderGoods(formData).then((res) => {
            console.log(res)
        })
    }

    // console.log(selectedData)

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={() => {
                    onClose()
                    reset(defaultValues)
                }}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Редактировать</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box display={'flex'} flexDirection={'column'} gap={3}>
                            <FormControl isInvalid={!!errors.provider}>
                                <Controller
                                    name="provider"
                                    control={control}
                                    rules={{ required: 'Поля является обязательным' }}
                                    render={({ field }) => {
                                        const { onChange, value } = field
                                        return (
                                            <Select
                                                options={providersData}
                                                getOptionLabel={(option: Providers) => option.name}
                                                getOptionValue={(option: Providers) =>
                                                    `${option.id}`
                                                }
                                                value={providersData?.find(
                                                    (option) => option.id === value,
                                                )}
                                                onChange={(selectedOption: Providers | null) => {
                                                    if (selectedOption) {
                                                        onChange(selectedOption.id)
                                                    }
                                                }}
                                                placeholder="Поставщик *"
                                                isClearable
                                                isSearchable
                                            />
                                        )
                                    }}
                                />
                                <FormErrorMessage>{errors.provider?.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.goods}>
                                <Input
                                    maxLength={20}
                                    {...register('goods', {
                                        required: 'Поле является обязательным',
                                    })}
                                    autoComplete="off"
                                    placeholder="Товары *"
                                    type="text"
                                />
                                <FormErrorMessage>{errors.goods?.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.unitOfMeasure}>
                                <Input
                                    maxLength={20}
                                    {...register('unitOfMeasure', {
                                        required: 'Поле является обязательным',
                                    })}
                                    autoComplete="off"
                                    placeholder="Единица измерения *"
                                    type="text"
                                />
                                <FormErrorMessage>{errors.unitOfMeasure?.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.bakery}>
                                <Controller
                                    name="bakery"
                                    control={control}
                                    rules={{ required: 'Поля является обязательным' }}
                                    render={({ field }) => {
                                        const { onChange, value } = field
                                        return (
                                            <Select
                                                isMulti
                                                options={bakery}
                                                value={bakery?.find((option) =>
                                                    value?.includes(option),
                                                )}
                                                onChange={(val) => onChange(val)}
                                                placeholder="Место *"
                                                isClearable
                                                isSearchable
                                            />
                                        )
                                    }}
                                />
                                <FormErrorMessage>{errors.bakery?.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.status}>
                                <Controller
                                    name="status"
                                    control={control}
                                    rules={{ required: 'Поля является обязательным' }}
                                    render={({ field }) => {
                                        const { onChange, value } = field
                                        return (
                                            <Select
                                                options={status}
                                                getOptionLabel={(option: status) => option.name}
                                                getOptionValue={(option: status) => option.name}
                                                value={status?.find(
                                                    (option) => option.name === value,
                                                )}
                                                onChange={(selectedOption: status | null) => {
                                                    if (selectedOption) {
                                                        onChange(selectedOption.name)
                                                    }
                                                }}
                                                placeholder="Статус *"
                                                isClearable
                                                isSearchable
                                            />
                                        )
                                    }}
                                />
                                <FormErrorMessage>{errors.status?.message}</FormErrorMessage>
                            </FormControl>
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="red"
                            mr={3}
                            onClick={() => {
                                onClose()
                                reset(defaultValues)
                            }}
                        >
                            Отмена
                        </Button>
                        <Button colorScheme="purple" onClick={handleSubmitForm(sendData)}>
                            Добавить
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProviderAddModal
