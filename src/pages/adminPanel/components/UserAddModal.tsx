import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    ModalOverlay,
    InputGroup,
    Input,
    FormControl,
    FormErrorMessage,
    Box,
} from '@chakra-ui/react'

import Select from 'react-select'
import { Controller, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { createUser, updateUser } from '../../../utils/services/user.service'
import PhoneInput from '@/components/shared/PhoneInput'
import { useNotify } from '@/utils/providers/ToastProvider'
import { User } from '@/utils/types/user.types'
import PasswordInput from '@/components/shared/PasswordInput'
import StatusSelect from '@/components/shared/StatusSelect'

// type status = {
//     id: number
//     name: string
// }

interface UserAddModalProps {
    data: User | undefined
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
}

const UserAddModal = ({ data, isOpen, onClose, onSuccess }: UserAddModalProps) => {
    const { loading } = useNotify()

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
        if (data) {
            Object.entries(data).forEach(([key, value]) => {
                setValue(key as keyof User, value)
            })
            setValue('permission', JSON.parse(String(data.permission)))
        } else {
            reset()
        }
    }, [data, isOpen, reset])

    const sendData = (formData: User) => {
        const responsePromise: Promise<any> = data
            ? updateUser(data.id, formData)
            : createUser(formData)

        loading(responsePromise)

        responsePromise
            .then(() => {
                reset()
                onSuccess()
                handleClose()
            })
            .catch((error) => {
                console.log(error)
                setError(error.response.data.field, {
                    message: error.response.data.message || 'Ошибка',
                })
            })
    }

    const permissions = [
        { label: 'Админ' },
        { label: 'Производство' },
        { label: 'Продажи' },
        { label: 'Закуп' },
        { label: 'Финансы' },
        { label: 'Отчеты' },
        { label: 'Инвентаризация' },
    ]

    // const status = [
    //     { id: 0, name: 'Активный' },
    //     { id: 1, name: 'Неактивный' },
    // ]

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
                                <InputGroup>
                                    <Input
                                        {...register('userClass', {
                                            required: 'Поле является обязательным',
                                        })}
                                        autoComplete="off"
                                        placeholder="Должность *"
                                        type="text"
                                    />
                                </InputGroup>
                                <FormErrorMessage>{errors.userClass?.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.permission}>
                                <Controller
                                    name="permission"
                                    control={control}
                                    rules={{ required: 'Поле является обязательным' }}
                                    render={({ field }) => {
                                        const { onChange, value } = field
                                        return (
                                            <Select
                                                isMulti
                                                options={permissions.map((permission) => ({
                                                    value: permission.label,
                                                    label: permission.label,
                                                }))}
                                                value={(value || []).map((val) => ({
                                                    value: val.label,
                                                    label: val.label,
                                                }))}
                                                onChange={(val) => onChange(val)}
                                                placeholder="Доступ *"
                                                isClearable
                                                isSearchable
                                            />
                                        )
                                    }}
                                />
                                <FormErrorMessage>{errors.permission?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.phone}>
                                <Controller
                                    name="phone"
                                    control={control}
                                    rules={{
                                        required: 'Поле является обязательным',
                                        minLength: {
                                            value: 10,
                                            message: 'Некорректный номер телефона.',
                                        },
                                        maxLength: {
                                            value: 10,
                                            message: 'Некорректный номер телефона.',
                                        },
                                    }}
                                    render={({ field }) => {
                                        const { onChange, value } = field
                                        return (
                                            <PhoneInput
                                                value={value}
                                                onChange={(val: string) => {
                                                    if (val.length <= 10) {
                                                        onChange(val)
                                                    }
                                                }}
                                            />
                                        )
                                    }}
                                />
                                <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
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

                            <FormControl isInvalid={!!errors.status}>
                                {/* <Controller
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
                                                onChange={(
                                                    selectedOption: {
                                                        id: number
                                                        name: string
                                                    } | null,
                                                ) => {
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

                            <FormControl isInvalid={!!errors.pass}>
                                <PasswordInput
                                    {...register('pass', {
                                        required: data ? false : 'Поле является обязательным',
                                    })}
                                    placeholder="Пароль *"
                                />
                                <FormErrorMessage>{errors.pass?.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.checkPass}>
                                <PasswordInput
                                    {...register('checkPass', {
                                        required: data ? false : 'Поле является обязательным',
                                        validate: (value) =>
                                            value === getValues('pass') ||
                                            'Пароли должны совпадать',
                                    })}
                                    placeholder="Подтвердите пароль *"
                                />
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
                    <ModalFooter gap={3}></ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UserAddModal
