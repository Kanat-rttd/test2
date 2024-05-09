import { useState, useEffect } from 'react'
import { createClient, updateClient } from '@/utils/services/client.service'
import Select from 'react-select'
import { Controller, useForm } from 'react-hook-form'
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
    InputRightElement,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import PasswordInput from '@/components/shared/PasswordInput'
import PhoneInput from '@/components/shared/PhoneInput'

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

interface status {
    id: number
    name: string
}

interface ReleaseAddModalProps {
    data: Releaser | undefined
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
}

const defaultValues = {
    name: '',
    surname: '',
    contact: '',
    telegrammId: '',
    status: '',
    password: '',
    checkPassword: '',
}

const ReleaseAddModal: React.FC<ReleaseAddModalProps> = ({ data, isOpen, onClose, onSuccess }) => {
    console.log(data)
    const status = [
        { id: 1, name: 'Активный' },
        { id: 2, name: 'Неактивный' },
    ]

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const {
        register,
        handleSubmit: handleSubmitForm,
        control,
        setValue,
        getValues,
        formState: { errors },
        reset,
    } = useForm<Releaser>()

    const sendData = (formData: Releaser) => {
        console.log(formData)
        if (data) {
            console.log('upd')
            updateClient(data.id, formData).then((res) => {
                console.log(res)
                onSuccess()
            })
        } else {
            createClient(formData).then((res) => {
                console.log(res)
                onSuccess()
            })
        }
        handleClose()
        reset(defaultValues)
    }

    useEffect(() => {
        if (data) {
            setValue('name', data.name)
            setValue('surname', data.surname)
            setValue('contact', data.contact)
            setValue('telegrammId', data.telegrammId)
            setValue('status', data.status)
        }
    }, [data])

    // const addClient = () => {
    //     try {
    //         createClient(formData).then((res) => {
    //             console.log(res)
    //         })
    //         onClose()
    //     } catch (error) {
    //         console.error(error)
    //     }

    //     onClose()
    // }

    // const updClient = () => {
    //     updateClient(formData.id, formData).then((res) => {
    //         console.log(res)
    //     })
    //     onClose()
    // }

    const handleClose = () => {
        onClose()
        reset(defaultValues)
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
                            })}
                        />
                        <FormErrorMessage>{errors.contact?.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.telegrammId}>
                        <InputGroup>
                            <Input
                                {...register('telegrammId', {
                                    required: 'Поле является обязательным',
                                })}
                                autoComplete="off"
                                placeholder="Телеграм ID *"
                                type="number"
                            />
                        </InputGroup>
                        <FormErrorMessage>{errors.telegrammId?.message}</FormErrorMessage>
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
                        />
                        <FormErrorMessage>{errors.status?.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.password}>
                        <PasswordInput
                            {...register('password', {
                                required: data ? false : 'Поля является обязательным',
                            })}
                            placeholder="Пароль *"
                        />
                        {/* <InputGroup>
                            <Input
                                {...register('password', {
                                    required: data ? false : 'Поле является обязательным',
                                })}
                                autoComplete="off"
                                placeholder="Пароль *"
                                type={show ? 'text' : 'password'}
                            />
                            <InputRightElement width="3.3rem">
                                <Button h="1.75rem" size="sm" onClick={handleClick}>
                                    {show ? <ViewIcon /> : <ViewOffIcon />} 
                                </Button>
                            </InputRightElement>
                        </InputGroup> */}
                        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.checkPassword}>
                        <InputGroup>
                            <Input
                                {...register('checkPassword', {
                                    required: data ? false : 'Поле является обязательным',
                                    validate: (value) =>
                                        value === getValues('password') ||
                                        'Пароли должны совпадать',
                                })}
                                autoComplete="off"
                                placeholder="Подтвердите пароль *"
                                type={show ? 'text' : 'password'}
                            />
                            <InputRightElement width="3.3rem">
                                <Button h="1.75rem" size="sm" onClick={handleClick}>
                                    {show ? <ViewIcon /> : <ViewOffIcon />}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
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
