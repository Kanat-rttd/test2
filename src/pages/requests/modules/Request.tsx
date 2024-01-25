import {
    Box,
    Tabs,
    TabList,
    Tab,
    TabIndicator,
    TabPanels,
    TabPanel,
    Button,
    useDisclosure,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'

import RequestAddModal from '@/pages/requests/components/RequestAddModal'

import TopNavBar from '@/components/NavBar'
import AccordionClients from '@/components/AccordionClients'
import { OrderArray } from '@/utils/types/types'
import TableData from '@/components/TableData'

import { getAllRequests } from '@/utils/services/request.service'

const RequestPage = () => {
    const { onOpen, onClose, isOpen } = useDisclosure()

    const [data, setData] = useState<OrderArray | null>(null)
    const [orderCount, setOrderCount] = useState(0)
    const [doneOrderCount, setDoneOrderCount] = useState(0)

    useEffect(() => {
        getAllRequests().then((res: OrderArray) => {
            //console.log(res)
            setData(res)
            setOrderCount(res.filter((order) => Boolean(order.done) === false).length)
            setDoneOrderCount(res.filter((order) => Boolean(order.done) === true).length)
        })
    }, [])

    const handleChangeStatus = (clientName: string) => {
        setData((prev) => {
            const updatedData = prev!.map((order) =>
                order.name === clientName ? { ...order, done: true } : order,
            )
            setOrderCount(updatedData.filter((order) => Boolean(order.done) === false).length)
            setDoneOrderCount(updatedData.filter((order) => Boolean(order.done) === true).length)
            return updatedData
        })
    }

    if (data === null) {
        return <div>Loading...</div>
    }

    return (
        <>
            <TopNavBar></TopNavBar>
            <Box p={5} display="flex" flexDirection={'column'} height="80vh">
                <Tabs position="relative" variant="variant">
                    <TabList display={'flex'} justifyContent={'space-between'}>
                        <Box display={'flex'}>
                            <Tab>Заказы {orderCount}</Tab>
                            <Tab>Готово {doneOrderCount}</Tab>
                        </Box>
                        <Box>
                            <Button onClick={onOpen}>Добавить заказ</Button>
                            <RequestAddModal isOpen={isOpen} onClose={onClose} />
                        </Box>
                    </TabList>

                    <TabIndicator mt="-1.5px" height="2px" bg="blue.500" borderRadius="1px" />
                    <TabPanels>
                        <TabPanel>
                            <AccordionClients
                                data={data.filter((order) => Boolean(order.done) === false)}
                                handleChangeStatus={handleChangeStatus}
                            />
                        </TabPanel>
                        <TabPanel>
                            <TableData
                                data={data.filter((order) => Boolean(order.done) === true)}
                            />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </>
    )
}

export default RequestPage
