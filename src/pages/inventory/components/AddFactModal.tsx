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

interface AddFactModalInputs {
    [key: string]: string
}

interface Place {
    id: number
    name: string
}

interface rawMaterials {
    id: number
    name: string
    uom: string
}

type FactModalProps = {
    isOpen: boolean
    onClose: () => void
}

const places = [
    { id: 1, name: 'Кладовка' },
    { id: 2, name: 'Цех 1' },
]

const FactModal = ({ isOpen, onClose }: FactModalProps) => {
    const { data: rawMaterials } = useApi<rawMaterials[]>('rawMaterials')

    // console.log(rawMaterials)

    const {
        register,
        handleSubmit: handleSubmitForm,
        control,
        getValues,
        setValue,
        formState: { errors },
        reset,
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
                    const material = rawMaterials && rawMaterials[index]
                    if (material) {
                        acc.push({
                            name: material.name,
                            place: formData.place,
                            unitOfMeasure: material.uom,
                            quantity: Number(formData[key as keyof AddFactModalInputs]),
                        })
                    }
                }
                return acc
            },
            [],
        )

        if (formattedData.length > 0) {
            console.log(formattedData)
            createFactInput(formattedData).then((res) => {
                console.log(res)
            })
        }
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
                                            options={places}
                                            getOptionLabel={(option: Place) => option.name}
                                            getOptionValue={(option: Place) => `${option.name}`}
                                            value={places?.filter(
                                                (option) => String(option.name) == value,
                                            )}
                                            onChange={(selectedOption: Place | null) => {
                                                if (selectedOption) {
                                                    onChange(selectedOption.name)
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

                        {rawMaterials &&
                            rawMaterials.map((material, index) => {
                                return (
                                    <Box
                                        display={'flex'}
                                        flexDirection={'row'}
                                        alignItems={'center'}
                                        justifyContent={'space-between'}
                                        key={index}
                                    >
                                        <Text>{material.name}</Text>
                                        <FormControl
                                            width={'70%'}
                                            key={material.id}
                                            isInvalid={!!errors[`quantity_${index}`]}
                                        >
                                            <InputGroup>
                                                <Input
                                                    {...register(`quantity_${index}`)}
                                                    autoComplete="off"
                                                    placeholder={`Количество ${material.name} *`}
                                                    type="text"
                                                />
                                                <InputRightAddon>{material.uom}</InputRightAddon>
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
