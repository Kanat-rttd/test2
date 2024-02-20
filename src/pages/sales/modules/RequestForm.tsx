import { Box, Heading, Input, IconButton, Text, VStack, useToast } from '@chakra-ui/react'
import { AddIcon, CloseIcon } from '@chakra-ui/icons'
import { useDisclosure } from '@chakra-ui/react'
import { useState, ChangeEvent } from 'react'
import dayjs from 'dayjs'
import BottomModal from '../components/BottomModal'
import getUserInfo from '@/utils/helpers/getUserInfo'
import { createSale } from '@/utils/services/sales.service'
import SuccessPage from '../components/SuccessPage'
import ErrorPage from '../components/ErrorPage'
import MobileNavbar from '@/components/MobileNavbar'

interface Product {
    id: number
    name: string
    price: number
    quantity: number
}

const RequestForm = () => {
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
    const [comment, setComment] = useState<string>('')
    const [isSuccess, setIsSuccess] = useState(false)
    const [isError, setIsError] = useState(false)
    const { isOpen, onToggle, onClose } = useDisclosure()
    const toast = useToast()

    const userInfo = getUserInfo()

    console.log(selectedProducts)

    const handleAddProduct = (product: Product): void => {
        setSelectedProducts([...selectedProducts, { ...product, quantity: 0 }])
        onClose()
    }

    const handleRemoveProduct = (index: number): void => {
        const updatedProducts = [...selectedProducts]
        updatedProducts.splice(index, 1)
        setSelectedProducts(updatedProducts)
    }

    const handleQuantityChange = (index: number, event: ChangeEvent<HTMLInputElement>): void => {
        const updatedProducts = [...selectedProducts]
        updatedProducts[index].quantity = parseInt(event.target.value)
        setSelectedProducts(updatedProducts)
    }

    const clientId = userInfo?.userId || ''

    const handleSubmit = (): void => {
        const requestData = {
            date: dayjs(new Date()).format('DD.MM.YYYY'),
            products: selectedProducts.map((product) => ({
                productId: product.id,
                orderedQuantity: product.quantity,
                price: product.price,
            })),
            comment: comment,
            clientId: clientId,
        }
        console.log(requestData)
        if (requestData.products.length === 0) {
            toast({
                title: 'Ошибка.',
                description: 'Выберите товары',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        } else if (requestData.products.some((product) => !product.orderedQuantity)) {
            toast({
                title: 'Ошибка.',
                description: 'Укажите количество для всех выбранных товаров',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        } else {
            createSale(requestData)
                .then((res) => {
                    console.log(res)
                    if (res.status === 200) {
                        setIsSuccess(true)
                    } else {
                        setIsError(true)
                    }
                })
                .catch((error) => {
                    console.error('Error creating sale:', error)
                    setIsError(true)
                })
        }
    }

    return (
        <>
            {isSuccess ? (
                <SuccessPage />
            ) : isError ? (
                <ErrorPage />
            ) : (
                <>
                    <MobileNavbar></MobileNavbar>
                    <Box
                        display="flex"
                        flexDirection="column"
                        height="100vh"
                        backgroundColor={'white'}
                        gap={5}
                    >
                        <Box
                            borderBottom={'2px solid #E2E2E2'}
                            width={'100%'}
                            display={'flex'}
                            flexDirection={'column'}
                            textAlign={'center'}
                            alignItems={'center'}
                            p={5}
                            gap={4}
                        >
                            <Heading>Заказ</Heading>
                            <Input
                                variant="filled"
                                placeholder="Filled"
                                width={'50%'}
                                borderRadius={'15'}
                                name="date"
                                defaultValue={dayjs(new Date()).format('DD.MM.YYYY')}
                                textAlign={'center'}
                            />
                        </Box>

                        <Box>
                            <VStack spacing={2}>
                                {selectedProducts.map((product, index) => (
                                    <Box
                                        key={index}
                                        p={5}
                                        display={'flex'}
                                        flexDirection={'row'}
                                        alignItems={'center'}
                                        borderBottom={'2px solid #E2E2E2'}
                                    >
                                        <Box width={'60%'}>
                                            {' '}
                                            <Text fontWeight={'bold'}>{product.name}</Text>{' '}
                                        </Box>
                                        <Box display={'flex'} flexDirection={'row'} width={'40%'}>
                                            <Input
                                                variant="filled"
                                                borderRadius={15}
                                                name="quantity"
                                                backgroundColor={'gray.100'}
                                                value={product.quantity}
                                                onChange={(e) => handleQuantityChange(index, e)}
                                            />
                                            <IconButton
                                                bg={'transparent'}
                                                color={'gray'}
                                                size={'md'}
                                                aria-label="remove item"
                                                marginRight={3}
                                                icon={<CloseIcon />}
                                                onClick={() => handleRemoveProduct(index)}
                                            />
                                        </Box>
                                    </Box>
                                ))}
                            </VStack>
                        </Box>

                        <Box textAlign={'center'} p={5}>
                            <IconButton
                                backgroundColor={'#F7B23B'}
                                borderRadius={15}
                                color={'white'}
                                size={'md'}
                                aria-label="Send email"
                                marginRight={3}
                                icon={<AddIcon />}
                                onClick={onToggle}
                            />
                        </Box>

                        <Box m={5} borderBottom={'1px solid #7C7C7C'}>
                            <Text mb="8px" color={'#7C7C7C'} textAlign={'left'}>
                                Комментарий
                            </Text>
                            <Input
                                border={'none'}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </Box>

                        <Box textAlign={'center'} p={5}>
                            <Input
                                variant="filled"
                                size={'lg'}
                                color={'white'}
                                backgroundColor={'#F7B23B'}
                                placeholder="Filled"
                                width={'100%'}
                                borderRadius={'15'}
                                textAlign={'center'}
                                defaultValue={'Заказать'}
                                onClick={handleSubmit}
                            />
                        </Box>
                    </Box>
                </>
            )}
            <BottomModal isOpen={isOpen} onClose={onClose} handleAddProduct={handleAddProduct} />
        </>
    )
}

export default RequestForm
