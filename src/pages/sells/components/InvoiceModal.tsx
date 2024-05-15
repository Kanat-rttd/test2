import React, { useRef } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    Box,
    Text,
    Divider,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Heading,
    IconButton,
} from '@chakra-ui/react'
import { DownloadIcon } from '@chakra-ui/icons'
import dayjs from 'dayjs'
import Arrival from './Arrival'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

interface InvoiceData {
    createdAt: Date
    clientId: number
    clientName: string
    invoiceNumber: number
    totalProducts: {
        id: number
        name: string
        price: number
        quantity: number
        totalPrice: number
    }[]
    totalSum: number
    dispatches: {
        id: number
        clientId: number
        createdAt: Date
        dispatch: number
        goodsDispatchDetails: {
            id: number
            productId: number
            quantity: number
            price: number | null
            product: {
                id: number
                name: string
                price: number
                bakingFacilityUnit: {
                    id: number
                    facilityUnit: string
                }
            }
        }[]
        client: {
            id: number
            name: string
        }
    }[]
}

interface EditModalProps {
    isOpen: boolean
    onClose: () => void
    selectedRow: InvoiceData | null
}

const InvoiceModal: React.FC<EditModalProps> = ({ isOpen, onClose, selectedRow }) => {
    console.log(selectedRow)
    const modalContentRef = useRef<HTMLDivElement>(null)

    const generatePDF = () => {
        const pdfWidth = 210

        const contentRef = modalContentRef.current

        if (!contentRef) {
            console.error('modalContentRef is null')
            return
        }

        const contentWidth = contentRef.offsetWidth * 0.4
        const contentHeight = contentRef.offsetHeight * 0.4

        const pdf = new jsPDF('p', 'mm', 'a4')

        const x = (pdfWidth - contentWidth) / 2
        const y = 0

        html2canvas(contentRef, { scale: window.devicePixelRatio * 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png')
            pdf.addImage(imgData, 'PNG', x, y, contentWidth, contentHeight)
            pdf.save('invoice.pdf')
        })
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay overflow={'hidden'} />
            <ModalContent maxWidth={'90%'} height={'90%'} margin={0} alignSelf={'center'}>
                <ModalCloseButton />
                <ModalBody display={'flex'} flexDirection={'row'}>
                    <Box width={'50%'}>
                        <IconButton
                            size={'sm'}
                            aria-label="downloadPdf"
                            onClick={generatePDF}
                            icon={<DownloadIcon />}
                        />
                        <Box ref={modalContentRef} p={5}>
                            <Box display={'flex'} justifyContent={'space-between'}>
                                <Text>#{selectedRow?.invoiceNumber}</Text>
                            </Box>
                            <Box display={'flex'} justifyContent={'space-between'} p={3}>
                                <Text>Расходная накладная от</Text>
                                <Text>{dayjs(selectedRow?.createdAt).format('DD-MM-YYYY')}</Text>
                            </Box>
                            <Divider
                                size={'lg'}
                                borderColor={'black'}
                                borderWidth={'2px'}
                                orientation="horizontal"
                            />
                            <Box display={'flex'} justifyContent={'space-between'} p={3}>
                                <Box
                                    display={'flex'}
                                    justifyContent={'space-between'}
                                    flexDirection={'column'}
                                    marginBottom={'5px'}
                                >
                                    <Text>Получатель</Text>
                                    <Text>Покупатель</Text>
                                </Box>
                                <Box
                                    display={'flex'}
                                    flexDirection={'column'}
                                    justifyContent={'space-between'}
                                    marginBottom={'5px'}
                                >
                                    <Text></Text>
                                    <Text>{selectedRow?.clientName}</Text>
                                </Box>
                            </Box>
                            <Divider
                                size={'lg'}
                                borderColor={'black'}
                                borderWidth={'2px'}
                                orientation="horizontal"
                                marginBottom={5}
                            />
                            <Table size={'xs'} variant={'unstyled'} fontSize={'12px'}>
                                <Thead>
                                    <Tr>
                                        <Th border={'none'} color={'RGB(108, 112, 219)'}>
                                            Продукция
                                        </Th>
                                        <Th border={'none'} color={'RGB(108, 112, 219)'}>
                                            Количество
                                        </Th>
                                        <Th border={'none'} color={'RGB(108, 112, 219)'}>
                                            Цена
                                        </Th>
                                        <Th border={'none'} color={'RGB(108, 112, 219)'}>
                                            Сумма
                                        </Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {selectedRow?.totalProducts.map((item, index) => (
                                        <Tr key={index}>
                                            <Td border={'1px solid black'} padding={'1'}>
                                                {item.name}
                                            </Td>
                                            <Td border={'1px solid black'} padding={'1'}>
                                                {item.quantity}
                                            </Td>
                                            <Td border={'1px solid black'} padding={'1'}>
                                                {item.price}
                                            </Td>
                                            <Td border={'1px solid black'} padding={'1'}>
                                                {item.totalPrice}
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                            <Box display={'flex'} marginBottom={5}>
                                <Text marginLeft={'auto'}>Получено</Text>
                                <Text>________</Text>
                            </Box>
                            <Box display={'flex'} flexDirection={'column'} marginBottom={'5px'}>
                                <Text marginLeft={'auto'}>Сверху: 5000 тг</Text>
                                <Text marginLeft={'auto'}>Всего: {selectedRow?.totalSum} тг</Text>
                            </Box>
                        </Box>
                    </Box>
                    <Box w={'1px'} bgColor={'black'} height={'95%'} alignSelf={'center'}></Box>

                    <Box width={'50%'} p={7}>
                        <Box>
                            <Heading size={'md'} textAlign={'center'}>
                                Оплата
                            </Heading>
                            <Divider
                                size={'lg'}
                                borderColor={'black'}
                                borderWidth={'2px'}
                                orientation="horizontal"
                            />
                        </Box>

                        <Box height={'100%'}>
                            <Arrival
                                invoiceNumber={selectedRow?.invoiceNumber}
                                totalSumm={selectedRow?.totalSum}
                            />
                        </Box>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default InvoiceModal
