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
    phone: string
    telegram: string
    status: string
}

interface ReleaseAddModal {
    data: Releaser | undefined
    isOpen: boolean
    onClose: () => void
}
const ReleaseAddModal = ({ data, isOpen, onClose }: ReleaseAddModal) => {
    return (
        <>
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
                                    // onChange={handleChange}
                                    placeholder="Имя пользователя"
                                    value={data?.name ?? ''}
                                />
                            </InputGroup>

                            <InputGroup>
                                <Input
                                    name="surname"
                                    placeholder="Фамилия"
                                    value={data?.surname ?? ''}
                                    // onChange={handleChange}
                                />
                            </InputGroup>
                            <InputGroup>
                                <Input
                                    type="tel"
                                    name="phone"
                                    placeholder="Контакты"
                                    value={data?.phone ?? ''}
                                    // onChange={handleChange}
                                />
                            </InputGroup>
                            <InputGroup>
                                <Input
                                    name="telegram"
                                    placeholder="Телеграм ID"
                                    value={data?.telegram ?? ''}
                                    // onChange={handleChange}
                                />
                            </InputGroup>
                            <InputGroup>
                                <Select
                                    name="status"
                                    placeholder="Статус"
                                    value={data?.status ?? ''}
                                >
                                    <option value={'Активен'}>Активен</option>
                                    <option value={'Приостановлен'}>Приостановлен</option>
                                </Select>
                            </InputGroup>
                        </Stack>
                    </ModalBody>
                    <ModalFooter display={'flex'} alignSelf={'center'} gap={5}>
                        <Button
                        // onClick={data ? updUser : addUser}
                        >
                            {data ? 'Редактировать' : 'Добавить'} реализатора
                        </Button>
                        <Button onClick={onClose}>Закрыть</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ReleaseAddModal
