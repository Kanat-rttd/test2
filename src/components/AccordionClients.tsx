import {
    Accordion,
    AccordionItem,
    AccordionButton,
    Box,
    Heading,
    AccordionIcon,
    AccordionPanel,
    Table,
    Tbody,
    Tr,
    Td,
    Tfoot,
    Button,
} from '@chakra-ui/react'

interface OrderArray {
    id: number
    userId: string
    totalPrice: string
    createdAt: Date
    done: number
    orderDetails: [
        {
            orderDetailsId: string
            productId: string
            orderedQuantity: string
            product: {
                name: string
                price: string
            }
        },
    ]
    user: {
        id: string
        name: string
    }
}

type accorfionClientType = {
    data: OrderArray[]
    handleChangeStatus: (clientName: OrderArray) => void
}

const AccordionClients = ({ data, handleChangeStatus }: accorfionClientType) => {
    const defaultIndex = Array.from({ length: data.length }, (_, index) => index)

    const handleConfirmClick = (clientName: OrderArray) => {
        handleChangeStatus(clientName)
    }

    if (!data || data.length === 0) {
        return <div>Данных в находящихся в обработке пока нет</div>
    }

    return (
        <Accordion
            defaultIndex={defaultIndex}
            allowMultiple
            style={{
                height: '100%',
                width: '100%',
                overflowX: 'auto',
                overflowY: 'auto',
                maxHeight: '79dvh',
                minHeight: '79dvh',
            }}
        >
            {data?.map((order, index) => (
                <AccordionItem key={index}>
                    <h2>
                        <AccordionButton backgroundColor={'#e6e6e6'}>
                            <Box
                                display={'flex'}
                                justifyContent={'space-between'}
                                as="span"
                                flex="1"
                                textAlign="left"
                            >
                                <Heading size={'sm'}>{order.user.name}</Heading>
                                <Heading size={'sm'}>Total</Heading>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={0}>
                        <Table variant="unstyled">
                            <Tbody>
                                {order.orderDetails.map((item, index) => (
                                    <Tr key={index}>
                                        <Td width={'80%'}>{item.product.name}</Td>
                                        <Td>{item.orderedQuantity}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                            <Tfoot>
                                <Tr>
                                    <Td></Td>
                                    <Td>
                                        <Button
                                            width={'100%'}
                                            onClick={() => handleConfirmClick(order)}
                                        >
                                            Подтвердить
                                        </Button>
                                    </Td>
                                </Tr>
                            </Tfoot>
                        </Table>
                    </AccordionPanel>
                </AccordionItem>
            ))}
        </Accordion>
    )
}

export default AccordionClients
