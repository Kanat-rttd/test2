import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Box,
    FormControl,
    FormErrorMessage,
    InputGroup,
    Input,
    InputRightAddon,
} from '@chakra-ui/react'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'
import { updatePurchase } from '@/utils/services/productPurchase.service'
import { useState, useEffect } from 'react'
import { useApi } from '@/utils/services/axios'
import dayjs from 'dayjs'

interface Purchase {
    id: number
    date: string
    providerId: number
    rawMaterialId: number
    quantity: number
    price: number
    deliverySum: number
    totalSum: number
    status?: { value: number; label: string } | string | undefined
    provider: {
        id: number
        name: string
    }
    providerGood: {
        id: number
        name: string
    }
}

interface rawMaterials {
    value: number
    label: string
    uom: string
}

interface Providers {
    value: number
    label: string
}

type EditModalProps = {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
    selectedData: Purchase | undefined
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

const EditModal = ({ isOpen, onClose, selectedData, onSuccess }: EditModalProps) => {
    const { data: providersData } = useApi<Providers[]>('providers')
    const { data: providerGoodsData } = useApi<ProviderGoods[]>('providerGoods')

    const [providerGoods, setProviderGoods] = useState<rawMaterials[]>([])
    const [selectedRawMaterial, setSelectedRawMaterial] = useState<rawMaterials | null>(null)
    
    useEffect(() => {
        const _providerGoods = providerGoodsData?.map((item) => {
            return { label: item.goods, value: item.id, uom: item.unitOfMeasure }
        })

        setProviderGoods(_providerGoods || [])
    }, [providerGoodsData])

    const {
        register,
        handleSubmit: handleSubmitForm,
        control,
        formState: { errors },
        setValue,
        reset,
    } = useForm<Purchase>()

    useEffect(() => {
        if (selectedData) {
            Object.entries(selectedData).forEach(([key, value]) => {
                setValue(key as keyof Purchase, value)
            })
            setValue('date', dayjs(selectedData.date).format('YYYY-MM-DD'))
        } else {
            reset()
        }
    }, [selectedData, isOpen, reset])

    const status = [
        { value: 1, label: 'Оплачено' },
        { value: 2, label: 'Не оплачено' },
    ]

    const updateData = (formData: Purchase) => {
        const purchaseId = selectedData?.id?.toString() ?? ''
        updatePurchase(purchaseId, formData)
            .then(() => {
                onSuccess()
                handleClose()
            })
            .catch((error) => {
                console.error('Error creating sale:', error)
            })
    }

    const handleClose = () => {
        reset()
        onClose()
    }
    
    

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Изменить</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box display={'flex'} flexDirection={'column'} gap={3}>
                        <FormControl isInvalid={!!errors.providerId}>
                            <Controller
                                name="providerId"
                                control={control}
                                rules={{ required: 'Поле является обязательным' }}
                                render={({ field }) => {
                                    const { onChange, value } = field
                                    return (
                                        <Select
                                            options={providersData}
                                            defaultValue={
                                                value
                                                    ? providersData?.filter(
                                                          (option) => option.value == value,
                                                      )
                                                    : null
                                            }
                                            onChange={(selectedOption) => {
                                                onChange(selectedOption?.value)
                                            }}
                                            placeholder="Поставщик *"
                                            isClearable
                                            isSearchable
                                        />
                                    )
                                }}
                            />
                            <FormErrorMessage>{errors.providerId?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors.rawMaterialId}>
                            <Controller
                                name="rawMaterialId"
                                control={control}
                                rules={{ required: 'Поля является обязательным' }}
                                render={({ field }) => {
                                    const { onChange, value } = field
                                    return (
                                        <Select
                                            options={providerGoods}
                                            defaultValue={providerGoods?.filter(
                                                (option) => option.value == Number(value),
                                            )}
                                            onChange={(selectedOption: rawMaterials | null) => {
                                                if (selectedOption) {
                                                    onChange(selectedOption.value)
                                                    setSelectedRawMaterial(selectedOption)
                                                }
                                            }}
                                            placeholder="Сырье *"
                                            isClearable
                                            isSearchable
                                        />
                                    )
                                }}
                            />
                            <FormErrorMessage>{errors.rawMaterialId?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors.quantity}>
                            <InputGroup>
                                <Input
                                    {...register('quantity', {
                                        required: 'Поле является обязательным',
                                    })}
                                    autoComplete="off"
                                    placeholder="Количество *"
                                    type="number"
                                />
                                <InputRightAddon>{selectedRawMaterial?.uom}</InputRightAddon>
                            </InputGroup>
                            <FormErrorMessage>{errors.quantity?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors.price}>
                            <Input
                                {...register('price', { required: 'Поле является обязательным' })}
                                autoComplete="off"
                                placeholder="Цена *"
                                type="number"
                            />
                            <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors.deliverySum}>
                            <Input
                                {...register('deliverySum', {
                                    required: 'Поле является обязательным',
                                })}
                                autoComplete="off"
                                placeholder="Сумма доставки *"
                                type="number"
                            />
                            <FormErrorMessage>{errors.deliverySum?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors.date}>
                            <Input
                                {...register('date', {
                                    required: 'Поле является обязательным',
                                })}
                                // defaultValue={selectedData ? dayjs(selectedData.date).format('YYYY-MM-DD') : undefined}
                                autoComplete="off"
                                placeholder="Дата *"
                                type="date"
                            />
                            <FormErrorMessage>{errors.date?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors.status}>
                            <Controller
                                name="status"
                                control={control}
                                rules={{ required: 'Поле является обязательным' }}
                                render={({ field }) => {
                                    const { onChange, value } = field
                                    return (
                                        <Select
                                            options={status}
                                            defaultValue={
                                                value
                                                    ? status?.filter(
                                                          (option) => option.label == value,
                                                      )
                                                    : null
                                            }
                                            onChange={(val: any) => onChange(val)}
                                            placeholder="Статус *"
                                            isClearable
                                            isSearchable
                                        />
                                    )
                                }}
                            />
                            <FormErrorMessage>{errors.status?.message}</FormErrorMessage>
                        </FormControl>
                    </Box>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="red" mr={3} onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button colorScheme="purple" onClick={handleSubmitForm(updateData)}>
                        Изменить
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default EditModal
