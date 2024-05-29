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
    Input,
    InputGroup,
    Box,
    Text,
    Select,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { updateDispatchQuantity } from '@/utils/services/dispatch.service'
import { DispatchType } from '@/utils/types/dispatch.types'
import { useNotify } from '@/utils/providers/ToastProvider'
import { getAllClients } from '@/utils/services/client.service'

interface EditModalInputs {
    [key: string]: string
}

interface Client {
    id: number
    name: string
}

interface EditModalProps {
    data: DispatchType | undefined
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, data, onSuccess }) => {
    const { loading } = useNotify()
    const [clientsData, setClientsData] = useState<Client[]>([])
    const {
        register,
        handleSubmit: handleSubmitForm,
        formState: { errors },
        setValue,
        setError,
    } = useForm<EditModalInputs>()

    useEffect(() => {
        getAllClients({ name: '', telegrammId: '', status: '' }).then((responseData) => {
            setClientsData(responseData)
        })
    }, [])

    const sendData = (formData: EditModalInputs) => {
        const formattedData = data?.goodsDispatchDetails.map((details, index) => ({
            id: details.id,
            productId: details.productId,
            quantity: formData[`quantity_${index}`],
        }))
        if (data?.id == undefined || formattedData == undefined) return
        try {
            const responsePromise: Promise<any> = updateDispatchQuantity(
                data.id,
                Number(formData.clientId),
                formattedData,
            )
            loading(responsePromise)
            console.log(responsePromise, formattedData, formData)
            responsePromise
                .then(() => {
                    onClose()
                    onSuccess()
                })
                .catch((error: any) => {
                    console.error('Update dispatch quantity error:', error)
                    throw error
                })
        } catch (error: any) {
            setError('root', {
                message: error.response.data.message || 'Ошибка',
            })
        }
    }

    useEffect(() => {
        if (data) {
            console.log(data)

            setValue('clientId', data.client.id.toString())
            data.goodsDispatchDetails.forEach((details, index) => {
                setValue(`quantity_${index}`, details.quantity.toString())
            })
        }
    }, [data])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Редактировать</ModalHeader>
                <ModalCloseButton />
                <ModalBody display={'flex'} flexDirection={'column'} gap={3}>
                    <FormControl isInvalid={!!errors.name}>
                        <Select
                            {...register('clientId', {
                                required: 'Поле является обязательным',
                            })}
                            placeholder="Имя *"
                            width={'100%'}
                        >
                            {clientsData?.map((client, index) => {
                                return (
                                    <option key={index} value={client.id}>
                                        {client.name}
                                    </option>
                                )
                            })}
                        </Select>
                        <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                    </FormControl>

                    {data &&
                        data.goodsDispatchDetails.map((details, index) => {
                            return (
                                <Box
                                    display={'flex'}
                                    flexDirection={'row'}
                                    alignItems={'center'}
                                    justifyContent={'space-between'}
                                    key={index}
                                >
                                    <Text>{details.product.name}</Text>
                                    <FormControl
                                        width={'70%'}
                                        key={index}
                                        isInvalid={!!errors[`quantity_${index}`]}
                                    >
                                        <InputGroup>
                                            <Input
                                                {...register(`quantity_${index}`, {
                                                    required: 'Поле является обязательным',
                                                })}
                                                autoComplete="off"
                                                placeholder={`Количество ${details.product.name} *`}
                                                type="text"
                                            />
                                        </InputGroup>
                                        <FormErrorMessage>
                                            {(errors as any)[`quantity_${index}`]?.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                </Box>
                            )
                        })}
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Закрыть
                    </Button>
                    <Button colorScheme="purple" onClick={handleSubmitForm(sendData)}>
                        Подтвердить
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default EditModal
