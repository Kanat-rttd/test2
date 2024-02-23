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
} from '@chakra-ui/react'

// import { ChangeEvent, useEffect, useState } from 'react'
// import { createProduct, updateProduct } from '../../../utils/services/product.service'
// import { getAllBakingFacilityUnits } from '@/utils/services/bakingFacilityUnits.service'

export interface Product {
    id: number
    name: string
    bakerType: string
    status: string
    price: number
    costPrice: number
}

interface ProductAddModalProps {
    data: Product | undefined
    isOpen: boolean
    onClose: () => void
}

const ProductAddModal = ({ data, isOpen, onClose }: ProductAddModalProps) => {
    // const [formData, setFormData] = useState({ name: '', bakingFacilityUnitId: '' })
    // const [facilityUnits, setFacilityUnits] = useState<FacilityUnit[] | undefined>()
    // useEffect(() => {
    //     if (data) {
    //         setFormData({
    //             name: data.name,
    //             bakingFacilityUnitId: data.bakeryType || '',
    //         })
    //     } else {
    //         setFormData({ name: '', bakingFacilityUnitId: '' })
    //     }
    // }, [data])

    // useEffect(() => {
    //     getAllBakingFacilityUnits().then((responseData) => {
    //         setFacilityUnits(responseData)
    //         console.log(responseData)
    //     })
    // }, [])

    // const handleChange = ({ target }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    //     console.log(formData)
    //     const { name, value } = target
    //     setFormData({
    //         ...formData,
    //         [name]: value,
    //     })
    // }

    // const addProduct = () => {
    //     createProduct(formData).then((res) => {
    //         console.log(res)
    //     })
    //     onClose()
    // }

    // const updProduct = () => {
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
                    <ModalHeader>{data ? 'Редактировать' : 'Добавить'} продукт</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={4}>
                            <Input
                                name="name"
                                // onChange={handleChange}
                                placeholder="Наименование"
                                value={data?.name ?? ''}
                            />
                            <Input
                                name="bakerType"
                                // onChange={handleChange}
                                placeholder="Цех"
                                value={data?.bakerType ?? ''}
                            />
                            <Input
                                name="price"
                                // onChange={handleChange}
                                placeholder="Цена"
                                value={data?.price ?? ''}
                            />
                            <Input
                                name="costPrice"
                                // onChange={handleChange}
                                placeholder="Себестоимость"
                                value={data?.costPrice ?? ''}
                            />
                            <Input
                                name="status"
                                // onChange={handleChange}
                                placeholder="Статус"
                                value={data?.status ?? ''}
                            />
                        </Stack>
                    </ModalBody>
                    <ModalFooter gap={3}>
                        <Button onClick={onClose}>Закрыть</Button>
                        <Button

                        // onClick={data ? updProduct : addProduct}
                        >
                            {data ? 'Редактировать' : 'Добавить'} продукт
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProductAddModal
