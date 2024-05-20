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
    FormControl,
    FormErrorMessage,
    Box,
} from '@chakra-ui/react'
import Select from 'react-select'

import { useEffect } from 'react'
import { createMagazine, updateMagazine } from '@/utils/services/magazines.service'
import { useForm, Controller } from 'react-hook-form'
import { useApi } from '@/utils/services/axios'
import { useNotify } from '@/utils/providers/ToastProvider'

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
    onSuccess: () => void
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

const MagazineAddModal = ({ data, isOpen, onClose, onSuccess }: ProductAddModalProps) => {
    const { data: clientsData } = useApi<Client[]>('client')
    const { loading } = useNotify()

    const {
        register,
        handleSubmit: handleSubmitForm,
        control,
        formState: { errors },
        setValue,
        setError,
        reset,
    } = useForm<MagazinesModalInput>()

    useEffect(() => {
        if (data) {
            Object.entries(data).forEach(([key, value]) => {
                setValue(key as keyof MagazinesModalInput, value)
            })
        } else {
            reset()
        }
    }, [data, isOpen, reset])

    const sendData = (formData: MagazinesModalInput) => {
        try {
            const responsePromise: Promise<any> = data
                ? updateMagazine(data.id, formData)
                : createMagazine(formData)
            loading(responsePromise)

            responsePromise.then(() => {
                reset()
                onSuccess()
                onClose()
            })
            reset()
        } catch (error: any) {
            setError('root', {
                message: error.response.data.message || 'Ошибка',
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
                        <form
                            onSubmit={handleSubmitForm(sendData)}
                            style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
                        >
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
                        </Stack>
                    </ModalBody>
                    <ModalFooter gap={3}>
                        {/* <Button onClick={onClose}>Закрыть</Button>
                        <Button onClick={handleSubmitForm(sendData)}>
                            {data ? 'Редактировать' : 'Добавить'} продукт
                        </Button> */}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default MagazineAddModal
