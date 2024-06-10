import {
    Box,
    Divider,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Textarea,
} from '@chakra-ui/react'
import { useState } from 'react'
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import { createDebtTransfer } from '@/utils/services/debtTransfer.service'
import { useApi } from '@/utils/services/axios'
import classes from '../index.module.css'

interface Client {
    id: number
    name: string
    surname: string
    contact: string
    telegrammId: string
    status: number
}

interface DebtTransferInputs {
    from: number
    to: number
    summa: string
    date: Date
    invoiceNumber: number
    comment: string
}

interface Magazines {
    id: number
    name: string
    clientId: number
    status: string
    client: {
        id: number
        name: string
    }
}

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

const DebtTransferForm = () => {
    const [selectedProvider, setSelectedProvider] = useState<string | null>(null)

    // const { data: debtTransfer } = useApi('debtTransfer')
    const { data: magazinesData } = useApi<Magazines[]>('magazines?status=Активный')
    const { data: clientsData } = useApi<Client[]>('client?status=Активный')
    const { data: dispatchesData } = useApi<InvoiceData[]>('release/invoice')

    const {
        register,
        handleSubmit: handleSubmitForm,
        control,
        formState: { errors },
        reset,
    } = useForm<DebtTransferInputs>()

    const sendData = (formData: DebtTransferInputs) => {
        createDebtTransfer(formData)
            .then(() => {
                reset()
            })
            .catch((error) => {
                console.error('Error creating sale:', error)
            })
    }

    return (
        <>
            <Box height={'100%'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                <Box
                    width={'50%'}
                    display={'flex'}
                    flexDirection={'column'}
                    gap={'15px'}
                    flex={1}
                    border={'1px solid gray'}
                    p={5}
                    borderRadius={5}
                >
                    <Heading size={'md'} textAlign={'center'}>
                        Перевод долга
                    </Heading>
                    <Divider></Divider>
                    <form
                        onSubmit={handleSubmitForm(sendData)}
                        style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
                    >
                        <FormControl
                            isInvalid={!!errors.from}
                            isRequired
                            display={'flex'}
                            width={'100%'}
                        >
                            <FormLabel width={'13%'}>От:</FormLabel>
                            <Controller
                                name="from"
                                control={control}
                                rules={{ required: 'Поле является обязательным' }}
                                render={({ field }) => {
                                    const { onChange, value } = field
                                    return (
                                        <Select
                                            options={clientsData}
                                            getOptionLabel={(option: Client) => option.name}
                                            getOptionValue={(option: Client) => `${option.id}`}
                                            value={clientsData?.filter(
                                                (option) => String(option.id) == String(value),
                                            )}
                                            // onChange={(val: Account) => onChange(val?.name)}
                                            onChange={(selectedOption: Client | null) => {
                                                if (selectedOption) {
                                                    onChange(selectedOption.id)
                                                    setSelectedProvider(selectedOption.name)
                                                }
                                            }}
                                            placeholder=""
                                            isClearable
                                            isSearchable
                                            className={classes.select}
                                        />
                                    )
                                }}
                            />
                            <FormErrorMessage>{errors.from?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl
                            isInvalid={!!errors.to}
                            isRequired
                            display={'flex'}
                            width={'100%'}
                        >
                            <FormLabel width={'13%'}>Кому:</FormLabel>
                            <Controller
                                name="to"
                                control={control}
                                rules={{ required: 'Поле является обязательным' }}
                                render={({ field }) => {
                                    const { onChange, value } = field
                                    const filteredMagazines = magazinesData?.filter(
                                        (option) => option.client.name == selectedProvider,
                                    )
                                    return (
                                        <Select
                                            options={filteredMagazines}
                                            getOptionLabel={(option: Magazines) => option.name}
                                            getOptionValue={(option: Magazines) => `${option.id}`}
                                            value={
                                                value
                                                    ? filteredMagazines?.filter(
                                                          (option) => option.id == value,
                                                      )
                                                    : null
                                            }
                                            onChange={(selectedOption: Magazines | null) => {
                                                if (selectedOption) {
                                                    onChange(selectedOption.id)
                                                }
                                            }}
                                            placeholder=""
                                            isClearable
                                            isSearchable
                                            className={classes.select}
                                        />
                                    )
                                }}
                            />
                            <FormErrorMessage>{errors.to?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors.summa}>
                            <Input
                                maxLength={20}
                                {...register('summa', { required: 'Поле является обязательным' })}
                                autoComplete="off"
                                placeholder="Сумма *"
                                type="number"
                            />
                            <FormErrorMessage>{errors.summa?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl variant={'floating'} isInvalid={!!errors.date}>
                            <Input
                                {...register('date', { required: 'Поле является обязательным' })}
                                autoComplete="off"
                                placeholder="Дата"
                                type="date"
                            />
                        </FormControl>

                        <FormControl isInvalid={!!errors.invoiceNumber}>
                            <Controller
                                name="invoiceNumber"
                                control={control}
                                rules={{ required: 'Поле является обязательным' }}
                                render={({ field }) => {
                                    const { onChange, value } = field
                                    return (
                                        <Select
                                            options={dispatchesData}
                                            getOptionLabel={(option: InvoiceData) =>
                                                String(option.invoiceNumber)
                                            }
                                            getOptionValue={(option: InvoiceData) =>
                                                `${option.invoiceNumber}`
                                            }
                                            value={dispatchesData?.filter(
                                                (option) =>
                                                    String(option.invoiceNumber) == String(value),
                                            )}
                                            // onChange={(val: Account) => onChange(val?.name)}
                                            onChange={(selectedOption: InvoiceData | null) => {
                                                if (selectedOption) {
                                                    onChange(selectedOption.invoiceNumber)
                                                }
                                            }}
                                            placeholder="Номер накладной *"
                                            isClearable
                                            isSearchable
                                        />
                                    )
                                }}
                            />
                            <FormErrorMessage>{errors.invoiceNumber?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl>
                            <Textarea
                                placeholder="Комментарий"
                                maxLength={50}
                                size="sm"
                                {...register('comment')}
                                resize="none"
                            />
                        </FormControl>
                        <Box
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
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
                </Box>
            </Box>
        </>
    )
}

export default DebtTransferForm
