import { useState, useEffect, ChangeEvent } from 'react'
import { createClient, updateClient } from '@/utils/services/client.service'
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
    Select,
    Stack,
} from '@chakra-ui/react'

export interface Releaser {
    id: number
    name: string
    surname: string
    contact: string
    telegrammId: string
    status: string
    password: string
}

interface ReleaseAddModalProps {
    data: Releaser | undefined
    isOpen: boolean
    onClose: () => void
}

const ReleaseAddModal: React.FC<ReleaseAddModalProps> = ({ data, isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        id: 0,
        name: '',
        surname: '',
        contact: '',
        telegrammId: '',
        password: '',
        status: '',
    })

    useEffect(() => {
        if (data) {
            setFormData(data)
        } else {
            setFormData({
                id: 0,
                name: '',
                surname: '',
                contact: '',
                telegrammId: '',
                password: '',
                status: '',
            })
        }
    }, [data])

    const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const addClient = () => {
        try {
            createClient(formData).then((res) => {
                console.log(res)
            })
            onClose()
        } catch (error) {
            console.error(error)
        }

        onClose()
    }

    const updClient = () => {
        updateClient(formData.id, formData).then((res) => {
            console.log(res)
        })
        onClose()
    }

    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
            <ModalContent>
                <ModalHeader>{data ? 'Редактировать' : 'Добавить'} реализатора</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={4}>
                        <InputGroup>
                            <Input
                                name="name"
                                onChange={handleInputChange}
                                placeholder="Имя пользователя"
                                value={formData.name ?? ''}
                            />
                        </InputGroup>
                        <InputGroup>
                            <Input
                                name="surname"
                                placeholder="Фамилия"
                                value={formData.surname ?? ''}
                                onChange={handleInputChange}
                            />
                        </InputGroup>
                        <InputGroup>
                            <Input
                                type="tel"
                                name="contact"
                                placeholder="Контакты"
                                value={formData.contact ?? ''}
                                onChange={handleInputChange}
                            />
                        </InputGroup>
                        <InputGroup>
                            <Input
                                name="telegrammId"
                                placeholder="Телеграм ID"
                                value={formData.telegrammId ?? ''}
                                onChange={handleInputChange}
                            />
                        </InputGroup>
                        <InputGroup>
                            <Input
                                name="password"
                                placeholder="Пароль"
                                value={formData.password ?? ''}
                                onChange={handleInputChange}
                            />
                        </InputGroup>
                        <InputGroup>
                            <Select
                                name="status"
                                placeholder="Статус"
                                value={formData.status}
                                onChange={handleSelectChange}
                            >
                                <option value={'1'}>Активен</option>
                                <option value={'0'}>Приостановлен</option>
                            </Select>
                        </InputGroup>
                    </Stack>
                </ModalBody>
                <ModalFooter display={'flex'} alignSelf={'center'} gap={5}>
                    <Button onClick={data ? updClient : addClient}>
                        {data ? 'Редактировать' : 'Добавить'} реализатора
                    </Button>
                    <Button onClick={onClose}>Закрыть</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ReleaseAddModal
