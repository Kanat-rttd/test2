import {
    Box,
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
    Select as ChakraSelect,
} from '@chakra-ui/react'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'
import { useApi } from '@/utils/services/axios'
import { useEffect } from 'react'
import { createProviderGoods, updateProviderGoods } from '@/utils/services/providerGoods.service'
import { useNotify } from '@/utils/providers/ToastProvider'

export type ProviderInputs = {
    id: number
    providerId: number
    goods: string
    unitOfMeasure: string
    bakery: { value: number; label: string }[]
    status: string
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
    onSuccess: () => void
}

const defaultValues = {
    provider: 0,
    goods: '',
    unitOfMeasure: '',
    bakery: [{ value: 0, label: '' }],
    status: '',
}

const ProviderAddModal = ({ isOpen, onClose, selectedData, onSuccess }: ModalProps) => {
    const { loading } = useNotify()
    const { data: providersData } = useApi<Providers[]>('providers')

    const {
        register,
        handleSubmit: handleSubmitForm,
        control,
        formState: { errors },
        setValue,
        setError,
        reset,
    } = useForm<ProviderInputs>()

    useEffect(() => {
        if (selectedData) {
            Object.entries(selectedData).forEach(([key, value]) => {
                setValue(key as keyof ProviderInputs, value)
            })
        } else {
            reset()
        }
    }, [selectedData, isOpen, reset])

    const bakery = [
        { value: 1, label: 'Батонный' },
        { value: 2, label: 'Заводской' },
    ]

    const sendData = (formData: ProviderInputs) => {
        try {
            console.log(formData);
            
            const responsePromise: Promise<any> = selectedData
                ? updateProviderGoods(selectedData.id, formData)
                : createProviderGoods(formData)
            loading(responsePromise)

            responsePromise.then(() => {
                reset()
                onSuccess()
                handleClose()
            })
            reset()
            
        } catch (error: any) {
            setError('root', {
                message: error.response.data.message || 'Ошибка',
            })
        }
    }

    const handleClose = () => {
        onClose()
        reset()
    }

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
                    <ModalHeader>{selectedData ? 'Редактировать' : 'Добавить'}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box display={'flex'} flexDirection={'column'} gap={3}>
                        <form
                            onSubmit={handleSubmitForm(sendData)}
                            style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
                        >
                            <FormControl isInvalid={!!errors.providerId}>
                                <Controller
                                    name="providerId"
                                    control={control}
                                    rules={{ required: 'Поле является обязательным' }}
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
                                <FormErrorMessage>{errors.providerId?.message}</FormErrorMessage>
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
                                <ChakraSelect
                                    {...register('status', {
                                        required: 'Поле является обязательным',
                                    })}
                                    name="status"
                                >
                                    <option value={'0'}>Активный</option>
                                    <option value={'1'}>Неактивный</option>
                                </ChakraSelect>
                                <FormErrorMessage>{errors.status?.message}</FormErrorMessage>
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
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        {/* <Button
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
                            {selectedData ? 'Редактировать' : 'Добавить'}
                        </Button> */}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProviderAddModal
