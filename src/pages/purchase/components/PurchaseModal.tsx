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
    Input,
    InputRightAddon,
    InputGroup,
} from '@chakra-ui/react'
import { Controller, useForm } from 'react-hook-form'
import useSWR from 'swr'
import { getAllRawMaterials } from '@/utils/services/rawMaterials.service'
import { createPurchase } from '@/utils/services/productPurchase.service'
import { useState } from 'react'
import Select from 'react-select'
import { useApi } from '@/utils/services/axios'
import { useNotify } from '@/utils/providers/ToastProvider'

type PurchaseModalProps = {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
}

interface Purchase {
    id: number
    date: Date
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
    rawMaterial: {
        id: number
        name: string
    }
}

interface rawMaterials {
    id: number
    name: string
    uom: string
}

interface Providers {
    value: number
    label: string
}

const PurchaseModal = ({ isOpen, onClose, onSuccess }: PurchaseModalProps) => {
    const { loading } = useNotify()
    const { data: rawMaterialsData } = useSWR<rawMaterials[]>('rawMaterials', {
        fetcher: () => getAllRawMaterials(),
    })

    const { data: providersData } = useApi<Providers[]>('providers')
    console.log(providersData)

    const [selectedRawMaterial, setSelectedRawMaterial] = useState<rawMaterials | null>(null)

    const {
        register,
        handleSubmit: handleSubmitForm,
        control,
        formState: { errors },
        reset,
    } = useForm<Purchase>()

    const status = [
        { value: 1, label: 'Оплачено' },
        { value: 2, label: 'Не оплачено' },
    ]

    const sendData = (formData: Purchase) => {
        const response: Promise<any> = createPurchase(formData)
        loading(response)
        response
            .then(() => {
                onSuccess()
                reset()
                onClose()
            })
            .catch((error) => {
                console.error('Error creating sale:', error)
            })
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Добавить закупки</ModalHeader>
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
                                            // defaultValue={providersData?.filter(
                                            //     (option) => option.value == value,
                                            // )}
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
                                rules={{ required: 'Поле является обязательным' }}
                                render={({ field }) => {
                                    const { onChange, value } = field
                                    return (
                                        <Select
                                            options={rawMaterialsData}
                                            getOptionLabel={(option: rawMaterials) => option.name}
                                            getOptionValue={(option: rawMaterials) =>
                                                `${option.id}`
                                            }
                                            value={rawMaterialsData?.filter((option) => {
                                                return option.id == value
                                            })}
                                            onChange={(selectedOption: rawMaterials | null) => {
                                                if (selectedOption) {
                                                    onChange(selectedOption.id)
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
                                autoComplete="off"
                                placeholder="Дата *"
                                type="date"
                                defaultValue={new Date().toISOString().split('T')[0]}
                            />
                            <FormErrorMessage>{errors.date?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors.status}>
                            <Controller
                                name="status"
                                control={control}
                                rules={{ required: 'Поле является обязательным' }}
                                render={({ field }) => {
                                    const { onChange } = field
                                    return (
                                        <Select
                                            options={status}
                                            value={
                                                status?.find(
                                                    (option) =>
                                                        option?.value ===
                                                        (typeof field.value === 'object'
                                                            ? field.value.value
                                                            : field.value),
                                                ) || ''
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
                    <Button colorScheme="red" mr={3} onClick={onClose}>
                        Отмена
                    </Button>
                    <Button colorScheme="purple" onClick={handleSubmitForm(sendData)}>
                        Добавить
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default PurchaseModal
