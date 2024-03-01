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

export type ProviderInputs = {
    id: number
    provider: string
    items: string
    unity: string
    bakery: { value: number; label: string }[]
    status: { value: number; label: string }[]
}

type ModalProps = {
    isOpen: boolean
    onClose: () => void
    selectedData: ProviderInputs | undefined
}

const defaultValues = {
    provider: '',
    items: '',
    unity: '',
    bakery: [{ value: 0, label: '' }],
    status: [{ value: 0, label: '' }],
}

const ProviderAddModal = ({ isOpen, onClose, selectedData }: ModalProps) => {
    const {
        register,
        handleSubmit: handleSubmitForm,
        control,
        formState: { errors },
        reset,
    } = useForm<ProviderInputs>()

    const bakery = [
        { value: 1, label: 'Батонный' },
        { value: 2, label: 'Заводской' },
    ]

    const status = [
        { value: 1, label: 'Активный' },
        { value: 2, label: 'Неактивный' },
    ]

    const sendData = (formData: ProviderInputs) => {
        console.log(formData)
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
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box display={'flex'} flexDirection={'column'} gap={3}>
                            <FormControl isInvalid={!!errors.provider}>
                                <Input
                                    maxLength={20}
                                    {...register('provider', {
                                        required: 'Поле является обязательным',
                                    })}
                                    autoComplete="off"
                                    placeholder="Поставщик *"
                                    type="text"
                                    defaultValue={selectedData?.provider}
                                />
                                <FormErrorMessage>{errors.provider?.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.items}>
                                <Input
                                    maxLength={20}
                                    {...register('items', {
                                        required: 'Поле является обязательным',
                                    })}
                                    autoComplete="off"
                                    placeholder="Товары *"
                                    type="text"
                                    defaultValue={selectedData?.items}
                                />
                                <FormErrorMessage>{errors.items?.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.unity}>
                                <Input
                                    maxLength={20}
                                    {...register('unity', {
                                        required: 'Поле является обязательным',
                                    })}
                                    autoComplete="off"
                                    placeholder="Единица измерения *"
                                    type="text"
                                    defaultValue={selectedData?.unity}
                                />
                                <FormErrorMessage>{errors.unity?.message}</FormErrorMessage>
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
                                                defaultValue={selectedData?.bakery}
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
                                        const { onChange } = field
                                        return (
                                            <Select
                                                options={status}
                                                value={status?.find((option) => option)}
                                                onChange={(val) => onChange(val)}
                                                placeholder="Статус *"
                                                isClearable
                                                isSearchable
                                                defaultValue={selectedData?.status}
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
