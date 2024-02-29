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
} from '@chakra-ui/react'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'
import { PurchaseEdit } from './ListTable'

type EditModalProps = {
    isOpen: boolean
    onClose: () => void
    selectedData: PurchaseEdit | undefined
}

const EditModal = ({ isOpen, onClose, selectedData }: EditModalProps) => {
    const {
        register,
        handleSubmit: handleSubmitForm,
        control,
        formState: { errors },
        // reset,
    } = useForm<PurchaseEdit>()

    const provider = [
        { value: 1, label: 'Поставщик' },
        { value: 2, label: 'Поставщик 2' },
    ]

    const raw = [
        { value: 1, label: 'Сырье' },
        { value: 2, label: 'Сырье 2' },
    ]

    const status = [
        { value: 1, label: 'Оплачено' },
        { value: 2, label: 'Не оплачено' },
    ]

    const updateData = (formData: PurchaseEdit) => {
        console.log(formData)
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Изменить</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box display={'flex'} flexDirection={'column'} gap={3}>
                        <FormControl isInvalid={!!errors.provider}>
                            <Controller
                                name="provider"
                                control={control}
                                // rules={{ required: 'Поля является обязательным' }}
                                render={({ field }) => {
                                    const { onChange } = field
                                    return (
                                        <Select
                                            options={provider}
                                            onChange={(val) => onChange(val)}
                                            value={provider?.find(
                                                (option) =>
                                                    option?.label === selectedData?.provider,
                                            )}
                                            placeholder="Поставщик *"
                                            isClearable
                                            isSearchable
                                        />
                                    )
                                }}
                            />
                            <FormErrorMessage>{errors.provider?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors.raw}>
                            <Controller
                                name="raw"
                                control={control}
                                // rules={{ required: 'Поля является обязательным' }}
                                render={({ field }) => {
                                    const { onChange } = field
                                    return (
                                        <Select
                                            options={raw}
                                            onChange={(val) => onChange(val)}
                                            value={raw?.find(
                                                (option) => option?.label === selectedData?.raw,
                                            )}
                                            placeholder="Сырье *"
                                            isClearable
                                            isSearchable
                                        />
                                    )
                                }}
                            />
                            <FormErrorMessage>{errors.raw?.message}</FormErrorMessage>
                        </FormControl>

                        {/* {console.log(selectedData?.qty)} */}
                        <FormControl isInvalid={!!errors.qty}>
                            <InputGroup>
                                <Input
                                    {...register('qty', { required: 'Поле является обязательным' })}
                                    autoComplete="off"
                                    placeholder="Количество *"
                                    type="number"
                                    defaultValue={selectedData?.qty}
                                />
                                <InputRightAddon>кг</InputRightAddon>
                            </InputGroup>
                            <FormErrorMessage>{errors.qty?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors.price}>
                            <Input
                                {...register('price', { required: 'Поле является обязательным' })}
                                autoComplete="off"
                                placeholder="Цена *"
                                type="number"
                                defaultValue={selectedData?.price}
                            />
                            <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors.price}>
                            <Input
                                {...register('price', { required: 'Поле является обязательным' })}
                                autoComplete="off"
                                placeholder="Сумма *"
                                type="number"
                                defaultValue={selectedData?.totalSum}
                            />
                            <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors.deliverySum}>
                            <Input
                                {...register('deliverySum', {
                                    required: 'Поле является обязательным',
                                })}
                                autoComplete="off"
                                placeholder="Сумма доставки *"
                                type="number"
                                defaultValue={selectedData?.deliverySum}
                            />
                            <FormErrorMessage>{errors.deliverySum?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors.date}>
                            <Input
                                {...register('date', {
                                    required: 'Поле является обязательным',
                                })}
                                autoComplete="off"
                                placeholder="Дата *"
                                type="date"
                                defaultValue={new Date().toISOString().split('T')[0]}
                            />
                            <FormErrorMessage>{errors.date?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors.status}>
                            <Controller
                                name="status"
                                control={control}
                                // rules={{ required: 'Поля является обязательным' }}
                                render={({ field }) => {
                                    const { onChange } = field
                                    return (
                                        <Select
                                            options={status}
                                            value={status?.find(
                                                (option) => option?.label === selectedData?.status,
                                            )}
                                            onChange={(val) => onChange(val)}
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
                    <Button colorScheme="red" mr={3} onClick={onClose}>
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
