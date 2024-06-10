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
    IconButton,
} from '@chakra-ui/react'
import { DownloadIcon } from '@chakra-ui/icons'
import dayjs from 'dayjs'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

interface InvoiceData {
    createdAt: Date
    contragentId: number
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
        contragentId: number
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
        contragent: {
            id: number
            contragentName: string
        }
    }[]
}

interface EditModalProps {
    isOpen: boolean
    onClose: () => void
    selectedRow: InvoiceData | null
}

const InvoiceModal: React.FC<EditModalProps> = ({ isOpen, onClose, selectedRow }) => {
    const modalContentRef = useRef<HTMLDivElement>(null)

    const generatePDF = () => {
        const pdfWidth = 210

        const contentRef = modalContentRef.current

        if (!contentRef) {
            console.error('modalContentRef is null')
            return
        }

        const contentWidth = contentRef.offsetWidth * 0.3
        const contentHeight = contentRef.offsetHeight * 0.3

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
            <ModalContent maxWidth={'40%'} height={'90%'} margin={0} alignSelf={'center'}>
                <ModalCloseButton />
                <ModalBody display={'flex'} flexDirection={'row'}>
                    <Box width={'100%'}>
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
                            <Box display={'flex'} justifyContent={'space-between'} p={2} pb={2}>
                                <Text>Расходная накладная от</Text>
                                <Text>{dayjs(selectedRow?.createdAt).format('DD-MM-YYYY')}</Text>
                            </Box>
                            <Divider
                                size={'lg'}
                                borderColor={'black'}
                                borderWidth={'2px'}
                                orientation="horizontal"
                            />
                            <Box display={'flex'} justifyContent={'space-between'} pt={1} p={2} pb={3}>
                                <Box
                                    display={'flex'}
                                    justifyContent={'space-between'}
                                    flexDirection={'column'}
                                >
                                    <Text>Получатель</Text>
                                    <Text>Покупатель</Text>
                                </Box>
                                <Box
                                    display={'flex'}
                                    flexDirection={'column'}
                                    justifyContent={'space-between'}
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
                                marginBottom={3}
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
                                    <Tr height={2}></Tr>
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
                            <Box display={'flex'} marginBottom={3} mt={3}>
                                <Text marginLeft={'auto'}>Получено</Text>
                                <Text>________</Text>
                            </Box>
                            <Box display={'flex'} flexDirection={'column'}>
                                <Text marginLeft={'auto'} fontWeight={'bold'}>Сверху: 5000 тг</Text>
                                <Text marginLeft={'auto'} fontWeight={'bold'}>Всего: {selectedRow?.totalSum} тг</Text>
                            </Box>
                        </Box>
                    </Box>
                    {/* <Box w={'1px'} bgColor={'black'} height={'95%'} alignSelf={'center'}></Box> */}

                    {/* <Box width={'50%'} p={7}>
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
                    </Box> */}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default InvoiceModal
