import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Stack,
    ModalFooter,
    ModalOverlay,
    Input,
    Box,
    Select,
    FormControl,
    FormErrorMessage,
    FormLabel,
    InputGroup,
    InputRightAddon,
} from '@chakra-ui/react'

import { createBaking, updateBaking } from '@/utils/services/baking.service'
import { useEffect, useState } from 'react'
import { useApi } from '@/utils/services/axios'
import { useForm } from 'react-hook-form'
import { useNotify } from '@/utils/providers/ToastProvider'
import { BakingDataType } from '@/utils/types/baking.types'
import dayjs from 'dayjs'
import InputNumber from '@/components/shared/NumberInput'

interface ClientAddModalProps {
    data?: BakingDataType | null
    isOpen: boolean
    quantity?: number
    onClose: () => void
    onSuccess: () => void
}

type GoodsCategoryType = {
    id: number
    category: string
    unitOfMeasure: string
}

const BakingAddModal = ({ data, isOpen, onClose, onSuccess }: ClientAddModalProps) => {
    const { loading } = useNotify()
    const {
        register,
        handleSubmit: handleSubmitForm,
        setValue,
        setError,
        formState: { errors },
        reset,
    } = useForm<BakingDataType>()

    const { data: products } = useApi<{ id: string; name: string }[]>('product?status=1')
    const { data: goodsCategoriesData } = useApi<GoodsCategoryType[]>('goodsCategories')
    const [bakingGoods, setBakingProducts] = useState<
        {
            goodsCategoryId: number
            quantity: number | undefined
        }[]
    >([])
    const productsNames = ['Мука', 'Соль', 'Дрожжи', 'Солод', 'Масло']

    useEffect(() => {
        if (!goodsCategoriesData) return
        const _bakingGoods = goodsCategoriesData
            .filter((item) => productsNames.includes(item.category))
            .map((item) => ({
                goodsCategoryId: item.id,
                quantity: undefined,
            }))
        setBakingProducts(_bakingGoods)
    }, [goodsCategoriesData])

    console.log(bakingGoods)

    useEffect(() => {
        if (data) {
            Object.entries(data).forEach(([key, value]) => {
                setValue(key as keyof BakingDataType, value)
            })
            setValue('dateTime', dayjs(data.dateTime).format('YYYY-MM-DD HH:mm'))
        } else {
            reset()
        }
    }, [data, isOpen, reset])

    const sendData = (formData: BakingDataType) => {
        console.log({ ...formData, bakingDetails: bakingGoods })
        const responsePromise: Promise<any> = data
            ? updateBaking(data.id, { ...formData, bakingDetails: bakingGoods })
            : createBaking({ ...formData, bakingDetails: bakingGoods })

        loading(responsePromise)

        responsePromise
            .then(() => {
                reset()
                onSuccess()
                onClose()
            })
            .catch((error) => {
                setError(error.response.data.field, {
                    message: error.response.data.message || 'Ошибка',
                })
            })
    }

    const handleModalClose = () => {
        reset()
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
                            <form
                                onSubmit={handleSubmitForm(sendData)}
                                style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
                            >
                                <FormControl isInvalid={!!errors.breadType} isRequired>
                                    <FormLabel fontWeight={'bold'}>Вид хлеба</FormLabel>
                                    <Select
                                        {...register('breadType', {
                                            required: 'Поле является обязательным',
                                        })}
                                        variant="filled"
                                        placeholder=""
                                        defaultValue={data ? data.product?.id : ''}
                                    >
                                        <option disabled value="">
                                            Выберите хлеб
                                        </option>
                                        {products?.map((product) => (
                                            <option key={product.id} value={product.id}>
                                                {product.name}
                                            </option>
                                        ))}
                                    </Select>
                                    <FormErrorMessage>{errors.breadType?.message}</FormErrorMessage>
                                </FormControl>
                                {bakingGoods.map((item, index) => {
                                    return (
                                        <Box key={index}>
                                            <FormLabel fontWeight={'bold'}>
                                                {
                                                    goodsCategoriesData?.find(
                                                        (category) =>
                                                            category.id === item.goodsCategoryId,
                                                    )?.category
                                                }
                                            </FormLabel>
                                            <InputGroup>
                                                <Input
                                                    isRequired
                                                    type="number"
                                                    autoComplete="off"
                                                    placeholder="Количество"
                                                    min="0"
                                                    onKeyDown={(e) => {
                                                        if (e.key === '-') {
                                                            e.preventDefault()
                                                        }
                                                        if (e.key === 'e') {
                                                            e.preventDefault()
                                                        }
                                                        if (
                                                            e.key === 'ArrowUp' ||
                                                            e.key === 'ArrowDown'
                                                        ) {
                                                            e.preventDefault()
                                                        }
                                                    }}
                                                    onChange={(e) => {
                                                        const newValue = Number(e.target.value)
                                                        const updatedBakingGoods = bakingGoods.map(
                                                            (item, idx) => {
                                                                if (idx === index) {
                                                                    return {
                                                                        ...item,
                                                                        quantity: newValue,
                                                                    }
                                                                }
                                                                return item
                                                            },
                                                        )
                                                        setBakingProducts(updatedBakingGoods)
                                                    }}
                                                />
                                                <InputRightAddon
                                                    w={'15%'}
                                                    display={'flex'}
                                                    justifyContent={'center'}
                                                >
                                                    {
                                                        goodsCategoriesData?.find(
                                                            (category) =>
                                                                category.id ===
                                                                item.goodsCategoryId,
                                                        )?.unitOfMeasure
                                                    }
                                                </InputRightAddon>
                                            </InputGroup>
                                        </Box>
                                    )
                                })}

                                <FormControl isInvalid={!!errors.temperature} isRequired>
                                    <FormLabel fontWeight={'bold'}>T</FormLabel>
                                    <InputNumber
                                        {...register('temperature', {
                                            required: 'Поле является обязательным',
                                        })}
                                        placeholder=""
                                    />
                                    <FormErrorMessage>
                                        {errors.temperature?.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.dateTime} isRequired>
                                    <FormLabel fontWeight={'bold'}>Дата и время</FormLabel>
                                    <Input
                                        {...register('dateTime', {
                                            required: 'Поле является обязательным',
                                        })}
                                        style={{
                                            width: '100%',
                                            height: '42px',
                                            border: '1px solid #e3e3e3',
                                            borderRadius: '5px',
                                            padding: '0 15px',
                                        }}
                                        type="datetime-local"
                                        defaultValue={
                                            data
                                                ? dayjs(data.dateTime).format('YYYY-MM-DD HH:mm')
                                                : dayjs().format('YYYY-MM-DD HH:mm')
                                        }
                                    />
                                    <FormErrorMessage>{errors.dateTime?.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.output} isRequired>
                                    <FormLabel fontWeight={'bold'}>Выход</FormLabel>
                                    <InputNumber
                                        {...register('output', {
                                            required: 'Поле является обязательным',
                                        })}
                                        placeholder=""
                                    />
                                    <FormErrorMessage>{errors.output?.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.defective} isRequired>
                                    <FormLabel fontWeight={'bold'}>Брак</FormLabel>
                                    <InputNumber
                                        {...register('defective', {
                                            required: 'Поле является обязательным',
                                        })}
                                        placeholder=""
                                    />
                                    <FormErrorMessage>{errors.defective?.message}</FormErrorMessage>
                                </FormControl>
                                <Box
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        marginTop: '10px',
                                    }}
                                >
                                    <Input
                                        width={'40%'}
                                        type="submit"
                                        bg="purple.500"
                                        color="white"
                                        cursor="pointer"
                                        value={data ? 'Редактировать' : 'Добавить'}
                                    />
                                </Box>
                            </form>
                        </Box>
                    </Stack>
                </ModalBody>
                <ModalFooter display={'flex'} alignSelf={'center'} gap={5}></ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default BakingAddModal
