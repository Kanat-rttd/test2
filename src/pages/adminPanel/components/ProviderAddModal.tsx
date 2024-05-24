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
} from '@chakra-ui/react'
import { Controller, useForm } from 'react-hook-form'
import CreatableSelect from 'react-select/creatable'
import Select from 'react-select'
import { useApi } from '@/utils/services/axios'
import { useEffect } from 'react'
import { createProviderGoods, updateProviderGoods } from '@/utils/services/providerGoods.service'
import { useNotify } from '@/utils/providers/ToastProvider'
import { ProviderInputs } from '@/utils/types/providerGoog.types'
import StatusSelect from '@/components/shared/StatusSelect'

interface ProviderGoods {
    id: number
    providerId: number
    goods: string
    unitOfMeasure: string
    place: { label: string }[]
    status: string
    provider: {
        id: number
        name: string
    }
}

interface Place {
    label: string
}

interface Providers {
    label: string
    value: number
}

type ModalProps = {
    isOpen: boolean
    onClose: () => void
    selectedData: ProviderGoods | undefined
    onSuccess: () => void
}

const ProviderAddModal = ({ isOpen, onClose, selectedData, onSuccess }: ModalProps) => {
    const { loading } = useNotify()
    const { data: providersData } = useApi<Providers[]>('providers')
    const { data: placesData } = useApi<Place[]>('place')

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
            setValue('bakery', JSON.parse(String(selectedData.place)))
        } else {
            reset()
        }
    }, [selectedData, isOpen, reset])

    const sendData = (formData: ProviderInputs) => {
        try {
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
                    reset()
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
                                                <CreatableSelect
                                                    options={providersData}
                                                    getOptionLabel={(option: Providers) =>
                                                        option.label
                                                    }
                                                    getOptionValue={(option: Providers) =>
                                                        `${option.value}`
                                                    }
                                                    value={providersData?.find(
                                                        (option) => option.value === value,
                                                    )}
                                                    onChange={(
                                                        selectedOption: Providers | null,
                                                    ) => {
                                                        if (selectedOption) {
                                                            onChange(selectedOption.value)
                                                        } else {
                                                            onChange('')
                                                        }
                                                    }}
                                                    placeholder="Поставщик *"
                                                    formatCreateLabel={(inputValue) =>
                                                        `Добавить "` + inputValue + `"`
                                                    }
                                                    isClearable
                                                    isSearchable
                                                />
                                            )
                                        }}
                                    />
                                    <FormErrorMessage>
                                        {errors.providerId?.message}
                                    </FormErrorMessage>
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
                                    <FormErrorMessage>
                                        {errors.unitOfMeasure?.message}
                                    </FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={!!errors.bakery}>
                                    <Controller
                                        name="bakery"
                                        control={control}
                                        rules={{ required: 'Поле является обязательным' }}
                                        render={({ field }) => {
                                            const { onChange, value } = field
                                            return (
                                                <Select
                                                    isMulti
                                                    options={placesData?.map((bakeryItem) => ({
                                                        value: bakeryItem.label,
                                                        label: bakeryItem.label,
                                                    }))}
                                                    value={(value || []).map((val) => ({
                                                        value: val.label,
                                                        label: val.label,
                                                    }))}
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
                                    <StatusSelect
                                        {...register('status', {
                                            required: 'Поле является обязательным',
                                        })}
                                    />
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

                    <ModalFooter></ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProviderAddModal
