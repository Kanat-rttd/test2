import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Box,
    FormControl,
    FormErrorMessage,
    InputGroup,
    Input,
    InputRightAddon,
    Text,
} from '@chakra-ui/react'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'
import { useEffect } from 'react'
import { updateFactInput } from '@/utils/services/factInput.service'

const defaultValues = {
    id: 0,
    name: '',
    place: '',
    unitOfMeasure: '',
    quantity: '',
    updatedAt: '',
}

type EditModalProps = {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
    selectedData: factInput | undefined
}

interface factInput {
    id: number
    name: string
    place: string
    unitOfMeasure: string
    quantity: number
    updatedAt: string
}

interface AddFactModalInputs {
    id: number
    name: string
    place: string
    unitOfMeasure: string
    quantity: string
    updatedAt: string
}

interface Place {
    id: number
    name: string
}

const places = [
    { id: 1, name: 'Кладовка' },
    { id: 2, name: 'Цех 1' },
]

const EditModal = ({ isOpen, onClose, selectedData, onSuccess }: EditModalProps) => {
    console.log(selectedData)

    const {
        register,
        handleSubmit: handleSubmitForm,
        control,
        formState: { errors },
        setValue,
        reset,
    } = useForm<AddFactModalInputs>()

    useEffect(() => {
        if (selectedData) {
            setValue('place', selectedData.place)
            setValue('quantity', String(selectedData.quantity))
        }
    }, [selectedData])

    const updateData = (formData: AddFactModalInputs) => {
        let name = selectedData?.name || ''
        let id = selectedData?.id || 0
        let quantity = parseFloat(formData.quantity)

        const sendData = { ...formData, name, quantity }
        console.log(sendData)

        updateFactInput(id, sendData)
            .then((res) => {
                console.log(res)
                onSuccess()
                handleClose()
            })
            .catch((error) => {
                console.error('Error updating data:', error)
            })
    }

    const handleClose = () => {
        reset(defaultValues)
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Изменить</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box display={'flex'} flexDirection={'column'} gap={3}>
                        <FormControl isInvalid={!!errors.place}>
                            <Controller
                                name="place"
                                control={control}
                                rules={{ required: 'Поля является обязательным' }}
                                render={({ field }) => {
                                    const { onChange, value } = field
                                    return (
                                        <Select
                                            options={places}
                                            getOptionLabel={(option: Place) => option.name}
                                            getOptionValue={(option: Place) => `${option.name}`}
                                            value={places?.filter(
                                                (option) => String(option.name) == value,
                                            )}
                                            onChange={(selectedOption: Place | null) => {
                                                if (selectedOption) {
                                                    onChange(selectedOption.name)
                                                }
                                            }}
                                            placeholder="Место *"
                                            isClearable
                                            isSearchable
                                        />
                                    )
                                }}
                            />
                            <FormErrorMessage>{errors.place?.message}</FormErrorMessage>
                        </FormControl>

                        <Box
                            display={'flex'}
                            flexDirection={'row'}
                            alignItems={'center'}
                            justifyContent={'space-between'}
                        >
                            <Text>{selectedData?.name}</Text>
                            <FormControl isInvalid={!!errors.quantity} width={'70%'}>
                                <InputGroup>
                                    <Input
                                        {...register('quantity', {
                                            required: 'Поле является обязательным',
                                        })}
                                        autoComplete="off"
                                        placeholder="Количество. *"
                                        type="string"
                                    />
                                    <InputRightAddon>{selectedData?.unitOfMeasure}</InputRightAddon>
                                </InputGroup>
                                <FormErrorMessage>{errors.quantity?.message}</FormErrorMessage>
                            </FormControl>
                        </Box>
                    </Box>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="red" mr={3} onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button colorScheme="purple" onClick={handleSubmitForm(updateData)}>
                        Изменить
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default EditModal
