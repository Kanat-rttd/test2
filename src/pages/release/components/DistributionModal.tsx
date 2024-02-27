import {
    Box,
    Button,
    Checkbox,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Text,
} from '@chakra-ui/react'
import { useState } from 'react'

interface DistributionModalProps {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

const DistributionModal: React.FC<DistributionModalProps> = ({ isOpen, onClose }) => {
    const data = [
        {
            bread: 'Итальяснкий',
        },
        {
            bread: 'Заводской',
        },
        {
            bread: 'Батон',
        },
        {
            bread: 'Городской',
        },
    ]

    const [recipient, setRecipient] = useState<string>('')
    const [selectedBreads, setSelectedBreads] = useState<{ name: string; quantity: number }[]>([])

    const handleRecipientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRecipient(event.target.value)
    }

    const handleBreadSelection = (bread: string) => {
        if (selectedBreads.find((item) => item.name === bread)) {
            setSelectedBreads(
                selectedBreads.map((item) =>
                    item.name === bread ? { ...item, quantity: item.quantity + 1 } : item,
                ),
            )
        } else {
            setSelectedBreads([...selectedBreads, { name: bread, quantity: 1 }])
        }
    }

    const handleQuantityChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        breadName: string,
    ) => {
        const quantity = parseInt(event.target.value)
        setSelectedBreads(
            selectedBreads.map((bread) =>
                bread.name === breadName ? { ...bread, quantity } : bread,
            ),
        )
    }

    const handleConfirm = () => {
        const distributionData = {
            userId: recipient,
            products: selectedBreads.map(({ name, quantity }) => ({ name, Количество: quantity })),
        }
        console.log(distributionData)
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Выдача продукции</ModalHeader>
                <ModalCloseButton />
                <ModalBody display={'flex'} gap={'10px'} flexDirection={'column'}>
                    <Select
                        placeholder="Выберите получателя"
                        width={'100%'}
                        onChange={handleRecipientChange}
                        value={recipient}
                    >
                        <option value="Алишер">Алишер</option>
                        <option value="Алишер 1">Алишер 1</option>
                        <option value="Алишер 2">Алишер 2</option>
                    </Select>

                    <Select placeholder="Выберите хлеб" width={'100%'} disabled></Select>

                    <Box
                        display={'grid'}
                        gridTemplateColumns={'repeat(3, 1fr)'}
                        gap={'10px'}
                        border={'1px solid #E2E8F0'}
                        padding={'5px'}
                        borderRadius={'8px'}
                        marginTop={'5px'}
                    >
                        {data.map((bread) => {
                            return (
                                <Checkbox
                                    checked={selectedBreads.some(
                                        (item) => item.name === bread.bread,
                                    )}
                                    onChange={() => handleBreadSelection(bread.bread)}
                                    key={bread.bread}
                                >
                                    {bread.bread}
                                </Checkbox>
                            )
                        })}
                    </Box>

                    <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
                        {selectedBreads.map(({ name, quantity }) => {
                            return (
                                <Box display={'flex'} gap={'10px'} key={name}>
                                    <Text>{name}</Text>
                                    <Input
                                        type="number"
                                        placeholder="Кол-во"
                                        value={quantity}
                                        onChange={(e) => handleQuantityChange(e, name)}
                                    />
                                </Box>
                            )
                        })}
                    </Box>
                </ModalBody>

                <ModalFooter>
                    <Button mr={3} onClick={onClose} colorScheme={'red'}>
                        Отмена
                    </Button>
                    <Button colorScheme={'purple'} onClick={handleConfirm}>
                        Подтвердить
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default DistributionModal
