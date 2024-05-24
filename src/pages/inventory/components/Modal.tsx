// import { useNotify } from '@/utils/providers/ToastProvider'
import { useApi } from '@/utils/services/axios'
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
    onSuccess: () => void
}

type EditModalInputs = {
    item: string
    qty: number
    comment: string
}

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

const CorrectModal = ({ isOpen, onClose, onSuccess }: EditModalProps) => {
    // const { loading } = useNotify()
    const { data: providerGoodsData } = useApi<ProviderGoods[]>('providerGoods')

    const {
        register,
        handleSubmit: handleSubmitForm,
        control,
        formState: { errors },
        // reset,
        // setError,
    } = useForm<EditModalInputs>()

    const sendData = (formData: EditModalInputs) => {
        console.log(formData);
        
        // const responsePromise: Promise<any> = create(formData)
        // loading(responsePromise)

        // responsePromise
        //     .then(() => {
        //         reset()
        //         onSuccess()
        //         handleClose()
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //         setError(error.response.data.field, {
        //             message: error.response.data.message || 'Ошибка',
        //         })
        //     })
    }

    // const handleClose = () => {
    //     reset()
    //     onClose()
    // }

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
                                    rules={{ required: 'Поле является обязательным' }}
                                    render={({ field }) => {
                                        const { onChange, value } = field
                                        return (
                                            <Select
                                                options={providerGoodsData || []}
                                                getOptionLabel={(option) => option.goods}
                                                getOptionValue={(option) => `${option.id}`}
                                                value={providerGoodsData?.find(
                                                    (option) => option.goods == value,
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
