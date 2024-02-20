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
    Box,
    Select,
    Text,
} from '@chakra-ui/react'

import { getAllProducts } from '@/utils/services/product.service'
import { createBaking } from '@/utils/services/baking.service'
import { useState, useEffect } from 'react'

interface ClientAddModalProps {
    data: bakingsData | undefined
    isOpen: boolean
    quantity?: number
    onClose: () => void
}

interface bakingsData {
    breadType: string
    flour: string
    salt: string
    yeast: string
    malt: string
    butter: string
    temperature: string
    time: string
    output: string
    product?: {
        name: string
        id: string
    }
}

const modalData = {
    breadType: '',
    flour: '',
    salt: '',
    yeast: '',
    malt: '',
    butter: '',
    temperature: '',
    time: '',
    output: '',
    product: {
        name: '',
        id: '',
    },
}

const BakingAddModal = ({ data, isOpen, onClose }: ClientAddModalProps) => {
    const [formData, setFormData] = useState({
        breadType: '',
        flour: '',
        salt: '',
        yeast: '',
        malt: '',
        butter: '',
        temperature: '',
        time: '',
        output: '',
        product: {
            name: '',
            id: '',
        },
    })

    useEffect(() => {
        console.log(data)
        if (data) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                breadType: data.breadType,
                flour: data.flour,
                salt: data.salt,
                yeast: data.yeast,
                malt: data.malt,
                butter: data.butter,
                temperature: data.temperature,
                time: data.time,
                output: data.output,
                product: data.product || { name: '', id: '' },
            }))
        }
    }, [data])

    const [products, setProducts] = useState<{ id: string; name: string }[]>([])

    useEffect(() => {
        Promise.all([getAllProducts()])
            .then(([products]) => {
                setProducts(products)
                console.log(products)
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })

        console.log(formData)
    }

    const addBaking = () => {
        try {
            createBaking(formData).then((res) => {
                console.log(res)
            })
            handleModalClose()
        } catch (error) {
            console.error(error)
        }
    }

    const editBaking = () => {
        console.log(formData)
    }

    const handleModalClose = () => {
        setFormData(modalData)
        onClose()
    }

    return (
        <Modal isCentered isOpen={isOpen} onClose={handleModalClose}>
            <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
            <ModalContent>
                <ModalHeader>{'Добавить'} заказ</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={4}>
                        <Box>
                            <Text fontWeight={'bold'}>Вид хлеба</Text>
                            <Select
                                variant="filled"
                                placeholder=""
                                name="breadType"
                                onChange={handleInputChange}
                                defaultValue={formData?.product?.id ?? ''}
                            >
                                <option disabled value="">
                                    Выберите хлеб
                                </option>
                                {products.map((product) => (
                                    <option key={product.id} value={product.id}>
                                        {product.name}
                                    </option>
                                ))}
                            </Select>
                            <Text fontWeight={'bold'}>Мука</Text>
                            <Input
                                type="number"
                                name="flour"
                                placeholder=""
                                value={formData?.flour ?? ''}
                                onChange={handleInputChange}
                            />

                            <Text fontWeight={'bold'}>Соль</Text>
                            <Input
                                type="number"
                                name="salt"
                                placeholder=""
                                value={formData?.salt ?? ''}
                                onChange={handleInputChange}
                            />

                            <Text fontWeight={'bold'}>Дрожжи</Text>
                            <Input
                                type="number"
                                name="yeast"
                                placeholder=""
                                value={formData?.yeast ?? ''}
                                onChange={handleInputChange}
                            />

                            <Text fontWeight={'bold'}>Солод</Text>
                            <Input
                                type="number"
                                name="malt"
                                placeholder=""
                                value={formData?.malt ?? ''}
                                onChange={handleInputChange}
                            />

                            <Text fontWeight={'bold'}>Масло</Text>
                            <Input
                                type="number"
                                name="butter"
                                placeholder=""
                                value={formData?.butter ?? ''}
                                onChange={handleInputChange}
                            />

                            <Text fontWeight={'bold'}>T</Text>
                            <Input
                                type="number"
                                name="temperature"
                                placeholder=""
                                value={formData?.temperature ?? ''}
                                onChange={handleInputChange}
                            />
                        </Box>
                        <Box>
                            <Text fontWeight={'bold'}>Время</Text>
                            <Input
                                type="time"
                                name="time"
                                placeholder=""
                                value={formData?.time ?? ''}
                                onChange={handleInputChange}
                            />

                            <Text fontWeight={'bold'}>Выход</Text>
                            <Input
                                type="number"
                                name="output"
                                placeholder=""
                                value={formData?.output ?? ''}
                                onChange={handleInputChange}
                            />
                        </Box>
                    </Stack>
                </ModalBody>
                <ModalFooter display={'flex'} alignSelf={'center'} gap={5}>
                    <Button onClick={data ? editBaking : addBaking}>
                        {data ? 'Редактировать' : 'Добавить'} заказ
                    </Button>
                    <Button onClick={handleModalClose}>Закрыть</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default BakingAddModal
