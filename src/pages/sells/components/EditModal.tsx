import React, { useEffect, useState } from 'react'
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
    InputGroup,
    Input,
    Box,
    Text,
} from '@chakra-ui/react'

interface Dispatch {
    id: number
    clientId: number
    createdAt: string
    dispatch: string
    goodsDispatchDetails: {
        id: number
        productId: number
        quantity: number
        price: string
        product: {
            name: string
            price: number
            bakingFacilityUnit: {
                id: number
                facilityUnit: string
            }
        }
    }[]
    client: {
        id: number
        name: string
    }
}

interface EditModalProps {
    isOpen: boolean
    onClose: () => void
    selectedRow: Dispatch | null
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, selectedRow }) => {
    const [formData, setFormData] = useState<Dispatch>({
        id: 0,
        clientId: 0,
        createdAt: '',
        dispatch: '',
        goodsDispatchDetails: [],
        client: {
            id: 0,
            name: '',
        },
    })

    useEffect(() => {
        if (selectedRow) {
            setFormData(selectedRow)
        }
    }, [selectedRow])

    const handleInputChange = (index: number, field: string, value: string | number) => {
        const updatedGoodsDispatchDetails = [...formData.goodsDispatchDetails]
        updatedGoodsDispatchDetails[index] = {
            ...updatedGoodsDispatchDetails[index],
            [field]: value,
        }
        setFormData((prevState) => ({
            ...prevState,
            goodsDispatchDetails: updatedGoodsDispatchDetails,
        }))
    }

    const updateData = () => {
        console.log(formData)
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign={'center'}>Изменить</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <InputGroup>
                            <Input
                                value={formData.client.name}
                                onChange={(e) =>
                                    setFormData((prevState) => ({
                                        ...prevState,
                                        client: {
                                            ...prevState.client,
                                            name: e.target.value,
                                        },
                                    }))
                                }
                                autoComplete="off"
                                placeholder="Имя *"
                                type="text"
                                marginBottom={3}
                                readOnly
                                bg={'RGB(223, 223, 223)'}
                            />
                        </InputGroup>
                    </FormControl>

                    <FormControl>
                        <InputGroup>
                            <Input
                                value={
                                    formData.createdAt
                                        ? new Date(formData.createdAt).toISOString().split('T')[0]
                                        : ''
                                }
                                onChange={(e) =>
                                    setFormData((prevState) => ({
                                        ...prevState,
                                        createdAt: e.target.value,
                                    }))
                                }
                                autoComplete="off"
                                placeholder="Дата *"
                                type="date"
                                marginBottom={3}
                                readOnly
                                bg={'RGB(223, 223, 223)'}
                            />
                        </InputGroup>
                    </FormControl>

                    <Box display="flex" gap={5} marginBottom={1}>
                        <Text width="50%">Название товара</Text>
                        <Text width="25%">Количество</Text>
                        <Text width="25%">Цена</Text>
                    </Box>

                    {formData.goodsDispatchDetails.map((detail, index) => (
                        <Box key={index} display={'flex'} gap={5} marginBottom={3}>
                            <FormControl width="50%">
                                <InputGroup>
                                    <Input
                                        value={detail.product.name}
                                        onChange={(e) =>
                                            handleInputChange(index, 'product.name', e.target.value)
                                        }
                                        autoComplete="off"
                                        placeholder="Название товара"
                                        type="text"
                                        readOnly
                                        bg={'RGB(223, 223, 223)'}
                                    />
                                </InputGroup>
                            </FormControl>

                            <FormControl width="25%">
                                <InputGroup>
                                    <Input
                                        value={detail.quantity}
                                        onChange={(e) =>
                                            handleInputChange(
                                                index,
                                                'quantity',
                                                parseInt(e.target.value),
                                            )
                                        }
                                        autoComplete="off"
                                        type="number"
                                        readOnly
                                        bg={'RGB(223, 223, 223)'}
                                    />
                                </InputGroup>
                            </FormControl>

                            <FormControl width="25%">
                                <InputGroup>
                                    <Input
                                        value={
                                            detail.price !== null
                                                ? detail.price
                                                : detail.product.price
                                        }
                                        onChange={(e) =>
                                            handleInputChange(index, 'price', e.target.value)
                                        }
                                        autoComplete="off"
                                        type="text"
                                    />
                                </InputGroup>
                            </FormControl>
                        </Box>
                    ))}
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Закрыть
                    </Button>
                    <Button colorScheme="purple" onClick={updateData}>
                        Подтвердить
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default EditModal
