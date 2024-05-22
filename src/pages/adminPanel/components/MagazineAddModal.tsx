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
    Select as ChakraSelect,
} from '@chakra-ui/react'
import Select from 'react-select'

import { useEffect } from 'react'
import { createMagazine, updateMagazine } from '@/utils/services/magazines.service'
import { useForm, Controller } from 'react-hook-form'
import { useApi } from '@/utils/services/axios'
import { useNotify } from '@/utils/providers/ToastProvider'
import { ClientType } from '@/utils/types/client.type'

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

const MagazineAddModal = ({ data, isOpen, onClose, onSuccess }: ProductAddModalProps) => {
    const { data: clientsData } = useApi<ClientType[]>('client')
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
                                        rules={{ required: 'Поле является обязательным' }}
                                        render={({ field }) => {
                                            const { onChange, value } = field
                                            return (
                                                <Select
                                                    options={clientsData}
                                                    getOptionLabel={(option: ClientType) => option.name}
                                                    getOptionValue={(option: ClientType) =>
                                                        `${option.id}`
                                                    }
                                                    value={clientsData?.filter(
                                                        (option) =>
                                                            String(option.id) == String(value),
                                                    )}
                                                    onChange={(selectedOption: ClientType | null) => {
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
                                    <ChakraSelect
                                        {...register('status', {
                                            required: 'Поле является обязательным',
                                        })}
                                    >
                                        {status.map((item) => {
                                            return <option value={item.name}>{item.name}</option>
                                        })}
                                    </ChakraSelect>
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
