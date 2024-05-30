import {
    Box,
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

import { createDispatch } from '@/utils/services/dispatch.service'
import { useNotify } from '@/utils/providers/ToastProvider'
import { useForm } from 'react-hook-form'
import { ClientType } from '@/utils/types/client.type'
import { useApi } from '@/utils/services/axios'

interface DistributionModalProps {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
    onSuccess: () => void
    status: string
}

type formType = {
    userId: number
    products: { name: string; id: number; quantity: number }
}

const DistributionModal: React.FC<DistributionModalProps> = ({
    isOpen,
    onClose,
    onSuccess,
    status,
}) => {
    const { loading, error } = useNotify()
    const { data: clientsData } = useApi<ClientType[]>('client?status=Активный')
    const { data: products } = useApi<{ id: string; name: string }[]>('product?status=Активный')

    const { handleSubmit: handleSubmitForm } = useForm<formType>()

    const [recipient, setRecipient] = useState<string>('')
    const [selectedBreads, setSelectedBreads] = useState<
        { id: string; name: string; quantity: number }[]
    >([])

    const handleRecipientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRecipient(event.target.value)
    }

    const handleBreadSelection = (bread: string, id: string) => {
        if (selectedBreads.find((item) => item.name === bread)) {
            setSelectedBreads(
                selectedBreads
                    .map((item) => (item.name === bread ? null : item))
                    .filter((item) => item !== null) as {
                    id: string
                    name: string
                    quantity: number
                }[],
            )
        } else {
            setSelectedBreads([...selectedBreads, { name: bread, id: id, quantity: 1 }])
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
        if (selectedBreads.length < 1) {
            error('Выберите продукт')
            return
        }
        const distributionData = {
            userId: recipient,
            products: selectedBreads.map(({ name, id, quantity }) => ({
                name,
                id,
                quantity: quantity,
            })),
            dispatch: status,
        }

        const responsePromise: Promise<any> = createDispatch(distributionData)
        loading(responsePromise)

        responsePromise
            .then(() => {
                onSuccess()
                onClose()
                setSelectedBreads([])
                setRecipient('')
            })
            .catch((error) => {
                console.error('Error creating sale:', error)
            })
    }

    const handleClose = () => {
        onClose()
        setSelectedBreads([])
        setRecipient('')
    }

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{status == '0' ? 'Выдача' : 'Возврат'} продукции</ModalHeader>
                <ModalCloseButton />
                <ModalBody display={'flex'} gap={'10px'} flexDirection={'column'}>
                    <form
                        onSubmit={handleSubmitForm(handleConfirm)}
                        style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
                    >
                        <Select
                            required
                            placeholder="Выберите получателя"
                            width={'100%'}
                            onChange={handleRecipientChange}
                            value={recipient}
                        >
                            {clientsData?.map((client, index) => {
                                return (
                                    <option key={index} value={client.id}>
                                        {client.name}
                                    </option>
                                )
                            })}
                        </Select>

                        <Box
                            width={'100%'}
                            gap={'10px'}
                            border={'1px solid #E2E8F0'}
                            padding={'5px'}
                            borderRadius={'8px'}
                            marginTop={'5px'}
                            display={'flex'}
                            flexWrap={'wrap'}
                        >
                            {products?.map((bread) => {
                                return (
                                    <Checkbox
                                        w={'45%'}
                                        p={'0 15px'}
                                        checked={selectedBreads.some(
                                            (item) => item.name === bread.name,
                                        )}
                                        onChange={() => handleBreadSelection(bread.name, bread.id)}
                                        key={bread.name}
                                    >
                                        <Text>{bread.name}</Text>
                                    </Checkbox>
                                )
                            })}
                        </Box>

                        <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
                            {selectedBreads.map(({ name, quantity }, index) => {
                                return (
                                    <Box
                                        width={'100%'}
                                        display={'flex'}
                                        gap={'10px'}
                                        alignItems={'center'}
                                        key={name}
                                    >
                                        <Text w={'40%'}>
                                            {index + 1}. {name}
                                        </Text>
                                        <Input
                                            w={'60%'}
                                            required={(!quantity)}
                                            type="number"
                                            placeholder="Кол-во"
                                            value={quantity}
                                            onChange={(e) => handleQuantityChange(e, name)}
                                        />
                                    </Box>
                                )
                            })}
                        </Box>
                        <Box
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                marginTop: '10px',
                            }}
                        >
                            <Input
                                width={'40%'}
                                type="submit"
                                bg="purple.500"
                                color="white"
                                cursor="pointer"
                                value={'Подтвердить'}
                            />
                        </Box>
                    </form>
                </ModalBody>

                <ModalFooter></ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default DistributionModal
