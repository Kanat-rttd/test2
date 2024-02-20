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
    Select,
} from '@chakra-ui/react'

import { ChangeEvent, useEffect, useState } from 'react'
import { createProduct, updateProduct } from '../../../utils/services/product.service'
import { getAllBakingFacilityUnits } from '@/utils/services/bakingFacilityUnits.service'

interface Product {
    id: number
    name: string
    bakeryType: string
}

interface ProductAddModalProps {
    data: Product | undefined
    isOpen: boolean
    onClose: () => void
}

interface FacilityUnit {
    id: number
    facilityUnit: string
}

const ProductAddModal = ({ data, isOpen, onClose }: ProductAddModalProps) => {
    const [formData, setFormData] = useState({ name: '', bakingFacilityUnitId: '' })
    const [facilityUnits, setFacilityUnits] = useState<FacilityUnit[] | undefined>()
    useEffect(() => {
        if (data) {
            setFormData({
                name: data.name,
                bakingFacilityUnitId: data.bakeryType || '',
            })
        } else {
            setFormData({ name: '', bakingFacilityUnitId: '' })
        }
    }, [data])

    useEffect(() => {
        getAllBakingFacilityUnits().then((responseData) => {
            setFacilityUnits(responseData)
            console.log(responseData)
        })
    }, [])

    const handleChange = ({ target }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        console.log(formData)
        const { name, value } = target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const addProduct = () => {
        createProduct(formData).then((res) => {
            console.log(res)
        })
        onClose()
    }

    const updProduct = () => {
        if (data) {
            updateProduct(data.id, formData).then((res) => {
                console.log(res)
            })
        }
        onClose()
    }

    return (
        <>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
                <ModalContent>
                    <ModalHeader>{data ? 'Редактировать' : 'Добавить'} продукт</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={4}>
                            <InputGroup>
                                <Input
                                    name="name"
                                    onChange={handleChange}
                                    placeholder="Название продукта"
                                    value={formData?.name ?? ''}
                                />
                            </InputGroup>

                            <Select
                                variant="filled"
                                placeholder="Тип цеха"
                                name="bakingFacilityUnitId"
                                onChange={handleChange}
                            >
                                {facilityUnits?.map((unit, index) => {
                                    return (
                                        <option key={index} value={unit.id}>
                                            {unit.facilityUnit}
                                        </option>
                                    )
                                })}
                            </Select>
                        </Stack>
                    </ModalBody>
                    <ModalFooter display={'flex'} alignSelf={'center'} gap={5}>
                        <Button onClick={data ? updProduct : addProduct}>
                            {data ? 'Редактировать' : 'Добавить'} продукт
                        </Button>
                        <Button onClick={onClose}>Закрыть</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProductAddModal
