import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormErrorMessage,
    InputGroup,
    Input,
    InputRightAddon,
    Box,
    Textarea,
} from '@chakra-ui/react'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'

type EditModalProps = {
    isOpen: boolean
    onClose: () => void
}

type EditModalInputs = {
    item: string
    qty: number
    comment: string
}

const CorrectModal = ({ isOpen, onClose }: EditModalProps) => {
    const {
        register,
        handleSubmit: handleSubmitForm,
        control,
        formState: { errors },
        // reset,
    } = useForm<EditModalInputs>()

    const sendData = (formData: EditModalInputs) => {
        console.log(formData)
    }

    const items = [
        {
            value: 1,
            label: 'Товар 1',
        },
        {
            value: 2,
            label: 'Товар 2',
        },
    ]
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Добавить корректировки</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box display={'flex'} flexDirection={'column'} gap={3}>
                            <FormControl isInvalid={!!errors.item}>
                                <Controller
                                    name="item"
                                    control={control}
                                    rules={{ required: 'Поля является обязательным' }}
                                    render={({ field }) => {
                                        const { onChange, value } = field
                                        return (
                                            <Select
                                                options={items}
                                                // getOptionLabel={(option) => option.category}
                                                // getOptionValue={(option) => `${option.id}`}
                                                value={items?.find(
                                                    (option) => option.label == value,
                                                )}
                                                onChange={(val) => onChange(val)}
                                                placeholder="Товар *"
                                                isClearable
                                                isSearchable
                                            />
                                        )
                                    }}
                                />
                                <FormErrorMessage>{errors.item?.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.qty}>
                                <InputGroup>
                                    <Input
                                        {...register('qty', {
                                            required: 'Поле является обязательным',
                                        })}
                                        autoComplete="off"
                                        placeholder="Количество *"
                                        type="number"
                                    />
                                    <InputRightAddon>кг</InputRightAddon>
                                </InputGroup>
                                <FormErrorMessage>{errors.qty?.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl>
                                <Textarea
                                    placeholder="Комментарий"
                                    maxLength={50}
                                    size="sm"
                                    {...register('comment')}
                                    resize="none"
                                />
                            </FormControl>
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={onClose}>
                            Отмена
                        </Button>
                        <Button colorScheme="purple" onClick={handleSubmitForm(sendData)}>
                            Отправить
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CorrectModal
