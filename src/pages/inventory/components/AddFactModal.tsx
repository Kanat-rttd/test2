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
    InputGroup,
    Input,
    Text,
    Box,
    InputRightAddon,
} from '@chakra-ui/react'
import { useApi } from '@/utils/services/axios'

import Select from 'react-select'
import { Controller, useForm } from 'react-hook-form'
import { createFactInput } from '@/utils/services/factInput.service'
import { useNotify } from '@/utils/providers/ToastProvider'

interface AddFactModalInputs {
    [key: string]: string
}

interface Place {
    label: string
}

// interface rawMaterials {
//     id: number
//     name: string
//     uom: string
// }

interface providerGoods {
    id: number
    providerId: number
    goods: string
    unitOfMeasure: string
    place: string
    status: string
    isDeleted: boolean
    provider: {
        id: number
        name: string
    }
}

type FactModalProps = {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
}

const FactModal = ({ isOpen, onClose, onSuccess }: FactModalProps) => {
    const { loading } = useNotify()
    const { data: providerGoodsData } = useApi<providerGoods[]>('providerGoods')
    const { data: placesData } = useApi<Place[]>('place')

    console.log(placesData)

    const {
        register,
        handleSubmit: handleSubmitForm,
        control,
        formState: { errors },
    } = useForm<AddFactModalInputs>()

    const sendData = (formData: AddFactModalInputs) => {
        const formattedData: {
            name: string
            place: string
            unitOfMeasure: string
            quantity: number
        }[] = Object.keys(formData).reduce(
            (
                acc: { name: string; place: string; unitOfMeasure: string; quantity: number }[],
                key,
            ) => {
                if (key !== 'place' && formData[key as keyof AddFactModalInputs] !== '') {
                    const index = Number(key.split('_')[1])
                    const material = providerGoodsData && providerGoodsData[index]
                    if (material) {
                        acc.push({
                            name: material.goods,
                            place: formData.place,
                            unitOfMeasure: material.unitOfMeasure,
                            quantity: Number(formData[key as keyof AddFactModalInputs]),
                        })
                    }
                }
                return acc
            },
            [],
        )

        if (formattedData.length == 0 || !formattedData) return
        const responsePromise: Promise<any> = createFactInput(formattedData)
        loading(responsePromise)
        responsePromise
            .then((res) => {
                console.log(res)
                onSuccess()
                onClose()
            })
            .catch((error) => {
                console.error('Error updating data:', error)
            })
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Ввод фактического количества</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box display={'flex'} flexDirection={'column'} gap={2}>
                        <FormControl isInvalid={!!errors.place}>
                            <Controller
                                name="place"
                                control={control}
                                rules={{ required: 'Поля является обязательным' }}
                                render={({ field }) => {
                                    const { onChange, value } = field
                                    return (
                                        <Select
                                            options={placesData}
                                            getOptionLabel={(option: Place) => option.label}
                                            getOptionValue={(option: Place) => `${option.label}`}
                                            value={placesData?.filter(
                                                (option) => String(option.label) == value,
                                            )}
                                            onChange={(selectedOption: Place | null) => {
                                                if (selectedOption) {
                                                    onChange(selectedOption.label)
                                                }
                                            }}
                                            placeholder="Место *"
                                            isClearable
                                            isSearchable
                                        />
                                    )
                                }}
                            />
                            <FormErrorMessage>{errors.place?.message}</FormErrorMessage>
                        </FormControl>

                        {providerGoodsData &&
                            providerGoodsData.map((item, index) => {
                                return (
                                    <Box
                                        display={'flex'}
                                        flexDirection={'row'}
                                        alignItems={'center'}
                                        justifyContent={'space-between'}
                                        key={index}
                                    >
                                        <Text>{item.goods}</Text>
                                        <FormControl
                                            width={'70%'}
                                            key={item.id}
                                            isInvalid={!!errors[`quantity_${index}`]}
                                        >
                                            <InputGroup>
                                                <Input
                                                    {...register(`quantity_${index}`)}
                                                    autoComplete="off"
                                                    placeholder={`Количество ${item.goods} *`}
                                                    type="text"
                                                />
                                                <InputRightAddon>
                                                    {item.unitOfMeasure}
                                                </InputRightAddon>
                                            </InputGroup>
                                            <FormErrorMessage>
                                                {(errors as any)[`quantity_${index}`]?.message}
                                            </FormErrorMessage>
                                        </FormControl>
                                    </Box>
                                )
                            })}
                    </Box>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="red" mr={3} onClick={onClose}>
                        Закрыть
                    </Button>
                    <Button colorScheme="purple" onClick={handleSubmitForm(sendData)}>
                        Добавить
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default FactModal
