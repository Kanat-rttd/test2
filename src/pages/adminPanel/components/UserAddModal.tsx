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
    InputGroup,
    Input,
    InputRightElement,
    InputLeftAddon,
    Select,
} from '@chakra-ui/react'

import { ChangeEvent, useEffect, useState } from 'react'
import { createUser, updateUser } from '../../../utils/services/user.service'

interface Users {
    id: number
    name: string
    pass: string
    phone: string
    userClass: string
}

interface UserAddModalProps {
    data: Users | undefined
    isOpen: boolean
    onClose: () => void
}

const UserAddModal = ({ data, isOpen, onClose }: UserAddModalProps) => {
    const [formData, setFormData] = useState({ name: '', pass: '', phone: '', userClass: '' })

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    useEffect(() => {
        if (data) {
            setFormData(data)
        } else {
            setFormData({ name: '', pass: '', phone: '', userClass: '' })
        }
    }, [data])

    const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const addUser = () => {
        createUser(formData).then((res) => {
            console.log(res)
        })
        onClose()
    }

    const updUser = () => {
        if (data) {
            updateUser(data.id, formData).then((res) => {
                console.log(res)
            })
        }
        onClose()
    }

    return (
        <>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
                <ModalContent>
                    <ModalHeader>{data ? 'Редактировать' : 'Добавить'} пользователя</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={4}>
                            <Input
                                name="name"
                                onChange={handleChange}
                                placeholder="Имя"
                                value={formData?.name ?? ''}
                            />
                            <Input
                                name="surname"
                                onChange={handleChange}
                                placeholder="Фамилия"
                                value={formData?.name ?? ''}
                            />
                            <Input
                                name="telegram"
                                onChange={handleChange}
                                placeholder="Телеграм ID"
                                value={formData?.name ?? ''}
                            />
                            <Select placeholder="Доступ">
                                <option value={'admin'}>Админ</option>
                                <option value={'client'}>Клиент</option>
                            </Select>
                            <Select placeholder="Статус">
                                <option value={'active'}>Активен</option>
                                <option value={'Не активен'}>Не активен</option>
                            </Select>

                            <InputGroup size={'lg'}>
                                <InputLeftAddon>+7</InputLeftAddon>
                                <Input
                                    type="tel"
                                    name="phone"
                                    placeholder="(777)-777-77-77"
                                    value={formData?.phone ?? ''}
                                    onChange={handleChange}
                                />
                            </InputGroup>

                            <InputGroup>
                                <Input
                                    name="pass"
                                    pr="4.5rem"
                                    type={show ? 'text' : 'password'}
                                    placeholder="Пароль"
                                    value={formData?.pass ?? ''}
                                    onChange={handleChange}
                                />
                                <InputRightElement width="4.5rem">
                                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                                        {show ? 'Скрыть' : 'Показать'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <InputGroup>
                                <Input
                                    name="pass"
                                    pr="4.5rem"
                                    type={show ? 'text' : 'password'}
                                    placeholder="Подвердите пароль"
                                    value={formData?.pass ?? ''}
                                    onChange={handleChange}
                                />
                                <InputRightElement width="4.5rem">
                                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                                        {show ? 'Скрыть' : 'Показать'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </Stack>
                    </ModalBody>
                    <ModalFooter gap={3}>
                        <Button onClick={onClose} colorScheme="red">
                            Отмена
                        </Button>
                        <Button onClick={data ? updUser : addUser} colorScheme="purple">
                            {data ? 'Редактировать' : 'Добавить'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UserAddModal
