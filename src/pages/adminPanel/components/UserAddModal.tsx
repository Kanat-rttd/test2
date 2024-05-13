import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    ModalOverlay,
    Button,
    InputGroup,
    Input,
    InputRightElement,
    FormControl,
    FormErrorMessage,
    Box,
} from '@chakra-ui/react'

import Select from 'react-select'
import { Controller, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { createUser, updateUser } from '../../../utils/services/user.service'
import PhoneInput from '@/components/shared/PhoneInput'
import { useNotify } from '@/utils/providers/ToastProvider'
import { User, userClass } from '@/utils/types/user.types'
import { mutate } from '@/utils/services/axios'

type status = {
    id: number
    name: string
}

interface UserAddModalProps {
    data: User | undefined
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
}

const UserAddModal = ({ data, isOpen, onClose, onSuccess }: UserAddModalProps) => {
    const { loading } = useNotify()
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const {
        register,
        handleSubmit: handleSubmitForm,
        control,
        getValues,
        setValue,
        setError,
        formState: { errors },
        reset,
    } = useForm<User>()

    useEffect(() => {
        console.log(data)
        if (data) {
            Object.entries(data).forEach(([key, value]) => {
                setValue(key as keyof User, value)
            })
        } else {
            reset()
        }
    }, [data, isOpen, reset])

    const sendData = (formData: User) => {
        try {
            const responsePromise: Promise<any> = data
                ? updateUser(data.id, formData)
                : createUser(formData)
            loading(responsePromise)

            responsePromise.then(() => {
                console.log('response')
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

    const userClasses = [
        { id: 1, name: 'Admin' },
        { id: 2, name: 'Client' },
    ]

    const status = [
        { id: 1, name: 'Активный' },
        { id: 2, name: 'Неактивный' },
    ]

    const handleClose = () => {
        onClose()
        reset()
    }

    return (
        <>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
                <ModalContent>
                    <ModalHeader>{data ? 'Редактировать' : 'Добавить'} адмперсонал</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display={'flex'} flexDirection={'column'} gap={3}>
                        <form
                            onSubmit={handleSubmitForm(sendData)}
                            style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
                        >
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

                            <FormControl isInvalid={!!errors.userClass}>
                                <Controller
                                    name="userClass"
                                    control={control}
                                    rules={{ required: 'Поле является обязательным' }}
                                    render={({ field }) => {
                                        const { onChange, value } = field
                                        return (
                                            <Select
                                                options={userClasses}
                                                getOptionLabel={(option: userClass) => option.name}
                                                getOptionValue={(option: userClass) =>
                                                    `${option.name}`
                                                }
                                                value={userClasses?.filter(
                                                    (option) => String(option.name) == value,
                                                )}
                                                onChange={(selectedOption: userClass | null) => {
                                                    if (selectedOption) {
                                                        onChange(selectedOption.name)
                                                    } else {
                                                        onChange(null)
                                                    }
                                                }}
                                                placeholder="Доступ *"
                                                isClearable
                                                isSearchable
                                            />
                                        )
                                    }}
                                />
                                <FormErrorMessage>{errors.userClass?.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.phone}>
                                <PhoneInput
                                    {...register('phone', {
                                        required: 'Поля является обязательным',
                                        minLength: {
                                            value: 10,
                                            message: 'Некорректный номер телефона.',
                                        },
                                        maxLength: {
                                            value: 10,
                                            message: 'Некорректный номер телефона.',
                                        },
                                    })}
                                />
                                <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
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
                                                getOptionLabel={(option: status) => option.name}
                                                getOptionValue={(option: status) => option.name}
                                                value={status.find(
                                                    (option) => option.name === value,
                                                )}
                                                onChange={(selectedOption: userClass | null) => {
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
                                />
                                <FormErrorMessage>{errors.status?.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.fixSalary}>
                                <InputGroup>
                                    <Input
                                        {...register('fixSalary', {
                                            required: 'Поле является обязательным',
                                            maxLength: {
                                                value: 10,
                                                message: 'Максимальная длина 10 символов',
                                            },
                                        })}
                                        autoComplete="off"
                                        placeholder="Фикс ЗП. *"
                                        type="number"
                                    />
                                </InputGroup>
                                <FormErrorMessage>{errors.fixSalary?.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.pass}>
                                <InputGroup>
                                    <Input
                                        {...register('pass', {
                                            required: data ? false : 'Поле является обязательным',
                                        })}
                                        autoComplete="off"
                                        placeholder="Пароль *"
                                        type={show ? 'text' : 'password'}
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                                            {show ? 'Скрыть' : 'Показать'}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage>{errors.pass?.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.checkPass}>
                                <InputGroup>
                                    <Input
                                        {...register('checkPass', {
                                            required: data ? false : 'Поле является обязательным',
                                            validate: (value) =>
                                                value === getValues('pass') ||
                                                'Пароли должны совпадать',
                                        })}
                                        autoComplete="off"
                                        placeholder="Подтвердите пароль *"
                                        type={show ? 'text' : 'password'}
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                                            {show ? 'Скрыть' : 'Показать'}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage>{errors.checkPass?.message}</FormErrorMessage>
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
                    </ModalBody>
                    <ModalFooter gap={3}>
                        {/* <Button onClick={handleClose} colorScheme="red">
                            Отмена
                        </Button>
                        <Button colorScheme="purple" onClick={handleSubmitForm(sendData)}>
                            {data ? 'Редактировать' : 'Добавить'}
                        </Button> */}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UserAddModal
