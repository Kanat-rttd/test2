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
    InputLeftAddon,
    FormControl,
    FormErrorMessage,
    Box,
} from '@chakra-ui/react'

import Select from 'react-select'
import { Controller, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { createUser, updateUser } from '../../../utils/services/user.service'

interface User {
    id: number
    name: string
    surname: string
    status: string
    pass: string
    checkPass: string
    phone: string
    userClass: string
    fixSalary: string
}

interface userClass {
    id: number
    name: string
}

interface status {
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
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const {
        register,
        handleSubmit: handleSubmitForm,
        control,
        getValues,
        setValue,
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
        console.log(formData)
        if (data) {
            updateUser(data.id, formData).then((res) => {
                console.log(res)
                onSuccess()
            })
        } else {
            createUser(formData).then((res) => {
                console.log(res)
                onSuccess()
            })
        }
        handleClose()
        reset()
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
                    <ModalHeader>{data ? 'Редактировать' : 'Добавить'} пользователя</ModalHeader>
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
                                    rules={{ required: 'Поля является обязательным' }}
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
                                <InputGroup>
                                    <InputLeftAddon>+7</InputLeftAddon>
                                    <Input
                                        {...register('phone', {
                                            required: 'Поле является обязательным',
                                            maxLength: {
                                                value: 10,
                                                message: 'Максимальная длина 10 символов',
                                            },
                                        })}
                                        autoComplete="off"
                                        placeholder="Номер телефона *"
                                        type="number"
                                    />
                                </InputGroup>
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
                                                onChange={(selectedOption: status | null) => {
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
