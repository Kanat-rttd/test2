import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
} from '@chakra-ui/react'

interface DistributionModalProps {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

const DistributionModal: React.FC<DistributionModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Выдача продукции</ModalHeader>
                <ModalCloseButton />
                <ModalBody display={'flex'} gap={'15px'} flexDirection={'column'}>
                    <Select placeholder="Выберите получаетля" width={'100%'}>
                        <option value="Алишер">Алишер</option>
                        <option value="Алишер 1">Алишер 1</option>
                        <option value="Алишер 2">Алишер 2</option>
                    </Select>

                    <Select placeholder="Выберите хлеб" width={'100%'}>
                        <option value="Лепешечный">Лепешечный</option>
                        <option value="Булочный">Булочный</option>
                        <option value="Заварной">Заварной</option>
                    </Select>
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
