import { useEffect } from 'react'
import { createClient, updateClient } from '@/utils/services/client.service'
// import Select from 'react-select'
import { useForm } from 'react-hook-form'
import {
    Button,
    Input,
    InputGroup,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    FormControl,
    FormErrorMessage,
} from '@chakra-ui/react'
import PasswordInput from '@/components/shared/PasswordInput'
import PhoneInput from '@/components/shared/PhoneInput'
import { useNotify } from '@/utils/providers/ToastProvider'
import StatusSelect from '@/components/shared/StatusSelect'

export interface Releaser {
    id: number
    name: string
    surname: string
    contact: string
    telegrammId: string
    status: string
    password: string
    checkPassword: string
}

// interface status {
//     id: number
//     name: string
// }

interface ReleaseAddModalProps {
    data: Releaser | undefined
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
}

// const defaultValues = {
//     name: '',
//     surname: '',
//     contact: '',
//     telegrammId: '',
//     status: '',
//     password: '',
//     checkPassword: '',
// }

const ReleaseAddModal: React.FC<ReleaseAddModalProps> = ({ data, isOpen, onClose, onSuccess }) => {
    const { loading } = useNotify()

    // const status = [
    //     { id: 1, name: 'Активный' },
    //     { id: 2, name: 'Неактивный' },
    // ]

    const {
        register,
        handleSubmit: handleSubmitForm,
        // control,
        setValue,
        getValues,
        setError,
        formState: { errors },
        reset,
    } = useForm<Releaser>()

    const sendData = (formData: Releaser) => {
        console.log(formData)
        try {
            const responsePromise: Promise<any> = data
                ? updateClient(data.id, formData)
                : createClient(formData)
            loading(responsePromise)

            responsePromise.then(() => {
                reset()
                onSuccess()
                handleClose()
            })
            reset()
        } catch (error: any) {
            setError('root', {
                message: error.response.data.message || 'Ошибка',
            })
        }
    }

    // useEffect(() => {
    //     if (data) {
    //         setValue('name', data.name)
    //         setValue('surname', data.surname)
    //         setValue('contact', data.contact)
    //         setValue('telegrammId', data.telegrammId)
    //         setValue('status', data.status)
    //     }
    // }, [data])

    useEffect(() => {
        if (data) {
            Object.entries(data).forEach(([key, value]) => {
                setValue(key as keyof Releaser, value)
            })
        } else {
            reset()
        }
    }, [data, isOpen, reset])

    const handleClose = () => {
        onClose()
        reset()
    }

    return (
        <Modal isCentered isOpen={isOpen} onClose={handleClose}>
            <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
            <ModalContent>
                <ModalHeader>{data ? 'Редактировать' : 'Добавить'} реализатора</ModalHeader>
                <ModalCloseButton />
                <ModalBody display={'flex'} flexDirection={'column'} gap={3}>
                    <FormControl isInvalid={!!errors.name}>
                        <InputGroup>
                            <Input
                                {...register('name', {
                                    required: 'Поле является обязательным',
                                })}
                                autoComplete="off"
                                placeholder="Имя *"
                                type="text"
                            />
                        </InputGroup>
                        <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.surname}>
                        <InputGroup>
                            <Input
                                {...register('surname', {
                                    required: 'Поле является обязательным',
                                })}
                                autoComplete="off"
                                placeholder="Фамилия *"
                                type="text"
                            />
                        </InputGroup>
                        <FormErrorMessage>{errors.surname?.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.contact}>
                        <PhoneInput
                            {...register('contact', {
                                required: 'Поля является обязательным',
                                minLength: {
                                    value: 10,
                                    message: 'Некорректный номер телефона.',
                                },
                                maxLength: {
                                    value: 10,
                                    message: 'Некорректный номер телефона.',
                                },
                                pattern: {
                                    value: /^\d+$/,
                                    message:
                                        'Некорректный номер телефона. Используйте только цифры',
                                },
                            })}
                        />
                        <FormErrorMessage>{errors.contact?.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.telegrammId}>
                        <InputGroup>
                            <Input
                                {...register('telegrammId', {
                                    required: 'Поле является обязательным',
                                    maxLength: {
                                        value: 20,
                                        message: 'Некорректный Телеграм ID',
                                    },
                                    pattern: {
                                        value: /^\d+$/,
                                        message:
                                            'Некорректный Телеграм ID. Используйте только цифры',
                                    },
                                })}
                                autoComplete="off"
                                placeholder="Телеграм ID *"
                                type="number"
                            />
                        </InputGroup>
                        <FormErrorMessage>{errors.telegrammId?.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.status}>
                        {/* <Controller
                            name="status"
                            control={control}
                            rules={{ required: 'Поле является обязательным' }}
                            render={({ field }) => {
                                const { onChange, value } = field
                                return (
                                    <Select
                                        options={status}
                                        getOptionLabel={(option: status) => option.name}
                                        getOptionValue={(option: status) => option.name}
                                        value={status.find((option) => option.name === value)}
                                        onChange={(selectedOption: status | null) => {
                                            if (selectedOption) {
                                                onChange(selectedOption.name)
                                            } else {
                                                onChange(null)
                                            }
                                        }}
                                        placeholder="Статус *"
                                        isClearable
                                        isSearchable
                                    />
                                )
                            }}
                        /> */}
                        <StatusSelect
                            {...register('status', {
                                required: 'Поле является обязательным',
                            })}
                        />
                        <FormErrorMessage>{errors.status?.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.password}>
                        <PasswordInput
                            {...register('password', {
                                required: data ? false : 'Поле является обязательным',
                            })}
                            placeholder="Пароль *"
                        />
                        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.checkPassword}>
                        <PasswordInput
                            {...register('checkPassword', {
                                required: data ? false : 'Поле является обязательным',
                                validate: (value) =>
                                    value === getValues('password') || 'Пароли должны совпадать',
                            })}
                            placeholder="Подтвердите пароль *"
                        />
                        <FormErrorMessage>{errors.checkPassword?.message}</FormErrorMessage>
                    </FormControl>
                </ModalBody>
                <ModalFooter display={'flex'} alignSelf={'center'} gap={5}>
                    {/* <Button onClick={data ? updClient : addClient}>
                        {data ? 'Редактировать' : 'Добавить'} реализатора
                    </Button> */}
                    <Button colorScheme="purple" onClick={handleSubmitForm(sendData)}>
                        {data ? 'Редактировать' : 'Добавить'}
                    </Button>
                    <Button onClick={handleClose}>Закрыть</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ReleaseAddModal
