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
    FormControl,
    FormErrorMessage,
} from '@chakra-ui/react'

import Select from 'react-select'
import { Controller, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { createDepartPersonal, updateDepartPersonal } from '@/utils/services/departPersonal.service'
import { mutate } from '@/utils/services/axios'

interface DepartPersonal {
    id: number
    name: string
    surname: string
    status: string
    userClass: string
    fixSalary: string
}

const defaultValues = {
    name: '',
    surname: '',
    status: '',
    userClass: '',
    fixSalary: '',
}

interface status {
    id: number
    name: string
}

interface DepartPesonalAddModalProps {
    data: DepartPersonal | undefined
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
}

const DepartPersonalModal = ({ data, isOpen, onClose, onSuccess }: DepartPesonalAddModalProps) => {
    console.log(data)

    const {
        register,
        handleSubmit: handleSubmitForm,
        control,
        setValue,
        formState: { errors },
        reset,
    } = useForm<DepartPersonal>()

    const sendData = (formData: DepartPersonal) => {
        console.log(formData)
        if (data) {
            updateDepartPersonal(data.id, formData).then((res) => {
                console.log(res)
                mutate('departPersonal')
                onSuccess()
            })
        } else {
            createDepartPersonal(formData).then((res) => {
                console.log(res)
                mutate('departPersonal')
                onSuccess()
            })
        }
        handleClose()
        reset(defaultValues)
    }

    const status = [
        { id: 1, name: 'Активный' },
        { id: 2, name: 'Неактивный' },
    ]

    useEffect(() => {
        if (data) {
            setValue('name', data.name)
            setValue('surname', data.surname)
            setValue('status', data.status)
            setValue('userClass', data.userClass)
            setValue('fixSalary', data.fixSalary)
        }
    }, [data])

    const handleClose = () => {
        onClose()
        reset(defaultValues)
    }

    return (
        <>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
                <ModalContent>
                    <ModalHeader>{data ? 'Редактировать' : 'Добавить'} пользователя</ModalHeader>
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
                                    })}
                                    autoComplete="off"
                                    placeholder="Фикс ЗП. *"
                                    type="string"
                                />
                            </InputGroup>
                            <FormErrorMessage>{errors.fixSalary?.message}</FormErrorMessage>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter gap={3}>
                        <Button onClick={handleClose} colorScheme="red">
                            Отмена
                        </Button>
                        <Button colorScheme="purple" onClick={handleSubmitForm(sendData)}>
                            {data ? 'Редактировать' : 'Добавить'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default DepartPersonalModal
