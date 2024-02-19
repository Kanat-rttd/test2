import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Stack,
    ModalFooter,
    ModalOverlay,
    Button,
    InputGroup,
    Input,
} from '@chakra-ui/react'

import { ChangeEvent, useEffect, useState } from 'react'
import { createProduct, updateProduct } from '../../../utils/services/product.service'

interface Product {
    id: number
    name: string
    bakeryType: string
}

interface ProductAddModalProps {
    isOpen: boolean
    onClose: () => void
}

const FacilityUnitAddModal = ({ isOpen, onClose }: ProductAddModalProps) => {
    // const [formData, setFormData] = useState({ name: '', bakeryType: '' })
    // useEffect(() => {
    //     if (data) {
    //         setFormData(data)
    //     } else {
    //         setFormData({ name: '', bakeryType: '' })
    //     }
    // }, [data])

    // const handleChange = ({ target }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    //     console.log(formData)
    //     const { name, value } = target
    //     setFormData({
    //         ...formData,
    //         [name]: value,
    //     })
    // }

    // const addProduct = () => {
    //     console.log(formData)
    //     createProduct(formData).then((res) => {
    //         console.log(res)
    //     })
    //     onClose()
    // }

    // const updProduct = () => {
    //     console.log(formData)
    //     if (data) {
    //         updateProduct(data.id, formData).then((res) => {
    //             console.log(res)
    //         })
    //     }
    //     onClose()
    // }

    return (
        <>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
                <ModalContent>
                    {/* <ModalHeader>{data ? 'Редактировать' : 'Добавить'} цех</ModalHeader> */}
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={4}>
                            <InputGroup>
                                <Input
                                    name="name"
                                    // onChange={handleChange}
                                    placeholder="Название цеха"
                                />
                            </InputGroup>
                        </Stack>
                    </ModalBody>
                    <ModalFooter display={'flex'} alignSelf={'center'} gap={5}>
                        {/* <Button onClick={data ? updProduct : addProduct}>
                            {data ? 'Редактировать' : 'Добавить'} цех
                        </Button> */}
                        <Button onClick={onClose}>Закрыть</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default FacilityUnitAddModal
