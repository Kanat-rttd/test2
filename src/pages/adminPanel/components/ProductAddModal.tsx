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
    Input,
    Select,
} from '@chakra-ui/react'

import { createProduct, updateProduct } from '@/utils/services/product.service'
import { ChangeEvent, useEffect, useState } from 'react'
import { getAllBakingFacilityUnits } from '@/utils/services/bakingFacilityUnits.service'

interface FacilityUnit {
    id: number
    facilityUnit: string
}

export interface Product {
    id: number
    name: string
    price: number
    costPrice: number
    status: string
    bakingFacilityUnit: {
        id: number
        facilityUnit: string
    }
}

interface ProductAddModalProps {
    data: Product | undefined
    isOpen: boolean
    onClose: () => void
    onAddProduct: () => void
}

const ProductAddModal = ({ data, isOpen, onClose, onAddProduct }: ProductAddModalProps) => {
    const [formData, setFormData] = useState<Product>({
        id: 0,
        name: '',
        bakingFacilityUnit: {
            id: 0,
            facilityUnit: '',
        },
        price: 0,
        costPrice: 0,
        status: '',
    })

    const [facilityUnits, setFacilityUnits] = useState<FacilityUnit[] | undefined>()

    useEffect(() => {
        if (data) {
            setFormData(data)
        } else {
            setFormData({
                id: 0,
                name: '',
                bakingFacilityUnit: {
                    id: 0,
                    facilityUnit: '',
                },
                price: 0,
                costPrice: 0,
                status: '',
            })
        }
    }, [data])

    useEffect(() => {
        getAllBakingFacilityUnits().then((responseData) => {
            setFacilityUnits(responseData)
        })
    }, [])

    const handleChange = ({ target }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const addProduct = () => {
        console.log(formData)
        createProduct(formData).then((res) => {
            console.log(res)
            onAddProduct()
        })
        onClose()
    }

    const updProduct = () => {
        console.log('upd')
        updateProduct(formData.id, formData).then((res) => {
            console.log(res)
            onAddProduct()
        })
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
                            <Input
                                name="name"
                                onChange={handleChange}
                                placeholder="Наименование"
                                value={formData.name}
                            />
                            <Select
                                name="bakingFacilityUnitId"
                                onChange={handleChange}
                                placeholder="Цех"
                                value={formData.bakingFacilityUnit.id}
                            >
                                {facilityUnits?.map((unit, index) => (
                                    <option key={index} value={unit.id}>
                                        {unit.facilityUnit}
                                    </option>
                                ))}
                            </Select>
                            <Input
                                type="number"
                                name="price"
                                onChange={handleChange}
                                placeholder="Цена"
                                value={formData.price}
                            />
                            <Input
                                type="number"
                                name="costPrice"
                                onChange={handleChange}
                                placeholder="Себестоимость"
                                value={formData.costPrice}
                            />
                            <Select
                                name="status"
                                onChange={handleChange}
                                placeholder="Статус"
                                value={formData.status}
                            >
                                <option value="">Статус</option>
                                <option value={'0'}>Неактивный</option>
                                <option value={'1'}>Активный</option>
                            </Select>
                        </Stack>
                    </ModalBody>
                    <ModalFooter gap={3}>
                        <Button onClick={onClose}>Закрыть</Button>
                        <Button onClick={data ? updProduct : addProduct}>
                            {data ? 'Редактировать' : 'Добавить'} продукт
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProductAddModal
