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
    Box,
    Text,
    Input,
    InputGroup,
    InputRightAddon,
    Select,
} from '@chakra-ui/react'

export interface UniquePrice {
    release: string
    date: string
    detail: {
        id: number
        bread: string
        price: string
        date: string
    }[]
}

interface UniquePriceAddModal {
    data: UniquePrice | undefined
    selectedRelease: string
    isOpen: boolean
    onClose: () => void
}

const UniquePriceAddModal = ({ data, selectedRelease, isOpen, onClose }: UniquePriceAddModal) => {
    return (
        <>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
                <ModalContent>
                    <ModalHeader>{data ? 'Изменить цены' : 'Добавить цену продукта'}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={4}>
                            <Box display={'flex'} flexDirection={'column'} gap={'15px'}>
                                {data ? (
                                    <>
                                        <Box display={'flex'} gap={'10px'}>
                                            <Text>Реализатор:</Text>
                                            <Text fontWeight={600}>{data?.release}</Text>
                                        </Box>
                                        <Box display={'flex'} gap={'10px'}>
                                            <Text>Продукт: </Text>
                                            <Text fontWeight={600}>{data.detail[0].bread}</Text>
                                        </Box>
                                        <InputGroup>
                                            <Input type="number" placeholder="Цена" />
                                            <InputRightAddon>₸</InputRightAddon>
                                        </InputGroup>
                                    </>
                                ) : (
                                    <>
                                        <Box display={'flex'} gap={'10px'}>
                                            <Text>Реализатор:</Text>
                                            <Text fontWeight={600}>{selectedRelease}</Text>
                                        </Box>
                                        <Select placeholder="Продукт">
                                            <option value={'Итальяснкий'}>Итальянский</option>
                                        </Select>
                                        <InputGroup>
                                            <Input type="number" placeholder="Цена" />
                                            <InputRightAddon>₸</InputRightAddon>
                                        </InputGroup>
                                    </>
                                )}
                            </Box>
                        </Stack>
                    </ModalBody>
                    <ModalFooter gap={3}>
                        <Button onClick={onClose} colorScheme="red">
                            Закрыть
                        </Button>
                        <Button
                            colorScheme="purple"
                            // onClick={data ? updUser : addUser}
                        >
                            {data ? 'Изменить' : 'Добавить'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UniquePriceAddModal
