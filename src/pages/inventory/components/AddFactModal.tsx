import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
} from '@chakra-ui/react'

type FactModalProps = {
    isOpen: boolean
    onClose: () => void
}

const FactModal = ({ isOpen, onClose }: FactModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Ввод фактического количества</ModalHeader>
                <ModalCloseButton />
                <ModalBody>prikol</ModalBody>

                <ModalFooter>
                    <Button colorScheme="red" mr={3} onClick={onClose}>
                        Закрыть
                    </Button>
                    <Button colorScheme="purple">Добавить</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default FactModal
