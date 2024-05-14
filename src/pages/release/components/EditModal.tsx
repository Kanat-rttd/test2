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
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { updateDispatchQuantity } from '@/utils/services/dispatch.service'

interface DispatchData {
    id: number
    clientId: number
    createdAt: Date
    dispatch: number
    goodsDispatchDetails: [
        {
            id: number
            price: number
            productId: number
            quantity: number
            product: {
                name: string
                price: number
                bakingFacilityUnit: {
                    id: number
                    facilityUnit: string
                }
            }
        },
    ]
    client: {
        id: number
        name: string
    }
}

interface EditModalInputs {
    [key: string]: string
}

interface EditModalProps {
    data: DispatchData | undefined
    isOpen: boolean
    onClose: () => void
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, data }) => {
    console.log(data)

    const sendData = (formData: EditModalInputs) => {
        const formattedData = {
            products: data?.goodsDispatchDetails.map((details, index) => ({
                id: details.id,
                productId: details.productId,
                quantity: formData[`quantity_${index}`],
            })),
        }

        console.log(formattedData)

        formattedData.products?.forEach((product) => {
            updateDispatchQuantity(product.id, product).then((res) => {
                console.log(res)
            })
        })
    }

    const {
        register,
        handleSubmit: handleSubmitForm,
        formState: { errors },
        setValue,
    } = useForm<EditModalInputs>()

    useEffect(() => {
        if (data) {
            console.log('conf')
            setValue('name', data.client.name)
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
                        <InputGroup>
                            <Input
                                {...register('name', {
                                    required: 'Поле является обязательным',
                                })}
                                autoComplete="off"
                                placeholder="Имя *"
                                type="string"
                            />
                        </InputGroup>
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
                                                {...register(`quantity_${index}`)}
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
