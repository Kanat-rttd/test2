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
                            <InputGroup>
                                <Input
                                    name="name"
                                    onChange={handleChange}
                                    placeholder="Имя пользователя"
                                    value={formData?.name ?? ''}
                                />
                            </InputGroup>

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
                                    placeholder="Введите новый пароль"
                                    value={formData?.pass ?? ''}
                                    onChange={handleChange}
                                />
                                <InputRightElement width="4.5rem">
                                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                                        {show ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>

                            <InputGroup>
                                <Input
                                    name="userClass"
                                    onChange={handleChange}
                                    placeholder="Класс"
                                    value={formData?.userClass ?? ''}
                                />
                            </InputGroup>
                        </Stack>
                    </ModalBody>
                    <ModalFooter display={'flex'} alignSelf={'center'} gap={5}>
                        <Button onClick={data ? updUser : addUser}>
                            {data ? 'Редактировать' : 'Добавить'} пользователя
                        </Button>
                        <Button onClick={onClose}>Закрыть</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UserAddModal
