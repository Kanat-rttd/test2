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
    FormControl,
    FormErrorMessage,
} from '@chakra-ui/react'
import Select from 'react-select'

import { useEffect } from 'react'
import { createMagazine, updateMagazine } from '@/utils/services/magazines.service'
import { useForm, Controller } from 'react-hook-form'
import { useApi } from '@/utils/services/axios'

interface Client {
    id: string
    name: string
    surname: string
    contact: string
    telegrammId: string
    status: string
}

interface Magazines {
    id: number
    name: string
    clientId: number
    status: string
    client: {
        id: number
        name: string
    }
}

interface ProductAddModalProps {
    data: Magazines | undefined
    isOpen: boolean
    onClose: () => void
}

interface MagazinesModalInput {
    name: string
    status: string
    clientId: number
}

const status = [
    {
        name: 'Активный',
    },
    {
        name: 'Неактивный',
    },
    {
        name: 'Приостановленный',
    },
]

interface Status {
    name: string
}

const MagazineAddModal = ({ data, isOpen, onClose }: ProductAddModalProps) => {
    const { data: clientsData } = useApi<Client[]>('client')

    console.log(data)

    const {
        register,
        handleSubmit: handleSubmitForm,
        control,
        formState: { errors },
        setValue,
        // reset,
    } = useForm<MagazinesModalInput>()

    useEffect(() => {
        if (data) {
            setValue('name', data.name)
            setValue('clientId', data.client.id)
            setValue('status', data.status)
        }
    }, [data])

    const sendData = (formData: MagazinesModalInput) => {
        console.log(formData)

        if (!data) {
            createMagazine(formData)
                .then((res) => {
                    console.log(res)
                })
                .catch((error) => {
                    console.error('Error creating sale:', error)
                })
        } else {
            console.log('update')
            updateMagazine(data.id, formData).then((res) => {
                console.log(res)
            })
        }
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
                            <FormControl isInvalid={!!errors.name}>
                                <Input
                                    maxLength={20}
                                    {...register('name', {
                                        required: 'Поле является обязательным',
                                    })}
                                    autoComplete="off"
                                    placeholder="Магазин *"
                                    type="string"
                                />
                                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.clientId}>
                                <Controller
                                    name="clientId"
                                    control={control}
                                    rules={{ required: 'Поля является обязательным' }}
                                    render={({ field }) => {
                                        const { onChange, value } = field
                                        return (
                                            <Select
                                                options={clientsData}
                                                getOptionLabel={(option: Client) => option.name}
                                                getOptionValue={(option: Client) => `${option.id}`}
                                                value={clientsData?.filter(
                                                    (option) => String(option.id) == String(value),
                                                )}
                                                // onChange={(val: Account) => onChange(val?.name)}
                                                onChange={(selectedOption: Client | null) => {
                                                    if (selectedOption) {
                                                        onChange(selectedOption.id)
                                                    }
                                                }}
                                                placeholder="Реализатор *"
                                                isClearable
                                                isSearchable
                                            />
                                        )
                                    }}
                                />
                                <FormErrorMessage>{errors.clientId?.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.status}>
                                <Controller
                                    name="status"
                                    control={control}
                                    rules={{ required: 'Поля является обязательным' }}
                                    render={({ field }) => {
                                        const { onChange, value } = field
                                        return (
                                            <Select
                                                options={status}
                                                getOptionLabel={(option: Status) => option.name}
                                                getOptionValue={(option: Status) =>
                                                    `${option.name}`
                                                }
                                                value={status?.filter(
                                                    (option) => String(option.name) == value,
                                                )}
                                                // onChange={(val: Account) => onChange(val?.name)}
                                                onChange={(selectedOption: Status | null) => {
                                                    if (selectedOption) {
                                                        onChange(selectedOption.name)
                                                    }
                                                }}
                                                placeholder="Статус *"
                                                isClearable
                                                isSearchable
                                            />
                                        )
                                    }}
                                />
                                <FormErrorMessage>{errors.status?.message}</FormErrorMessage>
                            </FormControl>
                        </Stack>
                    </ModalBody>
                    <ModalFooter gap={3}>
                        <Button onClick={onClose}>Закрыть</Button>
                        <Button onClick={handleSubmitForm(sendData)}>
                            {data ? 'Редактировать' : 'Добавить'} продукт
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default MagazineAddModal
