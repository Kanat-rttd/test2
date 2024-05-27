import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Stack,
    ModalFooter,
    ModalOverlay,
    InputGroup,
    Input,
    Box,
    Select,
} from '@chakra-ui/react'

import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { OrderArrayType } from '@/utils/types/order.types'
import { createSale, updateSale } from '@/utils/services/sales.service'
import { ClientType } from '@/utils/types/client.type'
import { Product } from '@/utils/types/product.types'
import { useApi } from '@/utils/services/axios'
import { useNotify } from '@/utils/providers/ToastProvider'

interface ClientAddModalProps {
    isOpen: boolean
    quantity?: number
    onClose: () => void
    selectedData: OrderArrayType | undefined
}

const modalData = {
    name: '',
    products: [{ productId: '', orderedQuantity: '', price: '' }],
}

type FormData = {
    name: string
    productId: string
    orderedQuantity: string
}

const RequestAddModal = ({ isOpen, onClose, selectedData }: ClientAddModalProps) => {
    const { loading } = useNotify()
    const { data: clients } = useApi<ClientType[]>('client')
    const { data: products } = useApi<Product[]>('product')
    const [formData, setFormData] = useState(modalData)
    const [transformedData, setTransformedData] = useState<any[]>([])

    const { handleSubmit: handleSubmitForm } = useForm<FormData>()

    const handleChange =
        (index: number, field: string) =>
        ({ target }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const { value } = target
            const newItems = [...formData.products]
            newItems[index] = { ...newItems[index], [field]: value }

            if (index === formData.products.length - 1) {
                newItems.push({ productId: '', orderedQuantity: '', price: '' })
            }

            setFormData({
                ...formData,
                products: newItems,
            })
            
            const _transformedData = newItems
                .filter((item) => item.productId !== '' && item.orderedQuantity !== '')
                .map((item) => ({
                    price: products?.find((product) => product.id === Number(item.productId))
                        ?.price,
                    productId: item.productId,
                    orderedQuantity: item.orderedQuantity,
                }))

            setTransformedData(_transformedData)
            
        }

    const handleNameChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target
        setFormData({
            ...formData,
            name: value,
        })
    }

    const addRequest = () => {
        try {
            const responsePromise: Promise<any> = selectedData
                ? updateSale(selectedData.id, {
                      clientId: formData.name ? formData.name : selectedData?.client.id,
                      products: [...transformedData],
                  })
                : createSale({ clientId: formData.name, products: [...transformedData] })
            loading(responsePromise)
            responsePromise.then((res) => {
                console.log(res)
                onClose()
            })
        } catch (error) {
            console.error(error)
        }
    }

    const handleModalClose = () => {
        setFormData(modalData)
        onClose()
    }

    return (
        <Modal isCentered isOpen={isOpen} onClose={handleModalClose}>
            <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
            <ModalContent>
                <ModalHeader>{selectedData ? 'Редактировать' : 'Добавить'} заказ</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={4}>
                        <form
                            onSubmit={handleSubmitForm(addRequest)}
                            style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
                        >
                            <Select
                                variant="filled"
                                placeholder="Имя клиента"
                                name="name"
                                onChange={handleNameChange}
                                defaultValue={selectedData?.client.id}
                            >
                                {clients?.map((client, index) => (
                                    <option key={index} value={client.id}>
                                        {client.name}
                                    </option>
                                ))}
                            </Select>
                            {selectedData
                                ? selectedData?.orderDetails.map((item, index) => (
                                      <Box key={index} display={'flex'}>
                                          <Select
                                              variant="filled"
                                              placeholder="Вид хлеба"
                                              name={`productId-${index}`}
                                              onChange={handleChange(index, 'productId')}
                                              defaultValue={item.productId}
                                          >
                                              {products?.map((product, index) => (
                                                  <option key={index} value={product.id}>
                                                      {product.name}
                                                  </option>
                                              ))}
                                          </Select>

                                          <InputGroup paddingLeft={15}>
                                              <Input
                                                  name={`orderedQuantity-${index}`}
                                                  onChange={handleChange(index, 'orderedQuantity')}
                                                  placeholder="Количество"
                                                  defaultValue={item.orderedQuantity}
                                              />
                                          </InputGroup>
                                      </Box>
                                  ))
                                : formData.products.map((item, index) => (
                                      <Box key={index} display={'flex'}>
                                          <Select
                                              variant="filled"
                                              placeholder="Вид хлеба"
                                              name={`productId-${index}`}
                                              onChange={handleChange(index, 'productId')}
                                              value={item.productId}
                                          >
                                              {products?.map((product, index) => (
                                                  <option key={index} value={product.id}>
                                                      {product.name}
                                                  </option>
                                              ))}
                                          </Select>

                                          <InputGroup paddingLeft={15}>
                                              <Input
                                                  name={`orderedQuantity-${index}`}
                                                  onChange={handleChange(index, 'orderedQuantity')}
                                                  placeholder="Количество"
                                                  value={item.orderedQuantity}
                                              />
                                          </InputGroup>
                                      </Box>
                                  ))}

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
                                    value={selectedData ? 'Редактировать' : 'Добавить'}
                                />
                            </Box>
                        </form>
                    </Stack>
                </ModalBody>
                <ModalFooter display={'flex'} alignSelf={'center'} gap={5}></ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default RequestAddModal
