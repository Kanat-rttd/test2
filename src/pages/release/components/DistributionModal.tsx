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

    const [selectedBreads, setSelectedBreads] = useState<string[]>([])

    const handleBreadSelection = (bread: string) => {
        if (selectedBreads.includes(bread)) {
            setSelectedBreads(selectedBreads.filter((selected) => selected !== bread))
        } else {
            setSelectedBreads([...selectedBreads, bread])
        }
    }

    console.log(selectedBreads)

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Выдача продукции</ModalHeader>
                <ModalCloseButton />
                <ModalBody display={'flex'} gap={'10px'} flexDirection={'column'}>
                    <Select placeholder="Выберите получаетля" width={'100%'}>
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
                                    checked={selectedBreads.includes(bread.bread)}
                                    onChange={() => handleBreadSelection(bread.bread)}
                                    key={bread.bread}
                                >
                                    {bread.bread}
                                </Checkbox>
                            )
                        })}
                    </Box>

                    <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
                        {selectedBreads &&
                            selectedBreads.map((bread: string) => {
                                return (
                                    <Box display={'flex'} gap={'10px'}>
                                        <Input placeholder={bread} />
                                        <Input placeholder="Кол-во" />
                                    </Box>
                                )
                            })}
                    </Box>
                </ModalBody>

                <ModalFooter>
                    <Button mr={3} onClick={onClose} colorScheme={'red'}>
                        Отмена
                    </Button>
                    <Button colorScheme={'purple'}>Подтвердить</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default DistributionModal
