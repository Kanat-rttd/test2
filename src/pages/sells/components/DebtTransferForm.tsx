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
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import { createDebtTransfer } from '@/utils/services/debtTransfer.service'
import { useApi } from '@/utils/services/axios'
import classes from '../index.module.css'
import { ContragentType } from '@/utils/types/contragent.types'
import { MagazineType } from '@/utils/types/magazine.type'
import { useNotify } from '@/utils/providers/ToastProvider'

interface DebtTransferInputs {
    from: number
    to: number
    summa: string
    date: Date
    invoiceNumber: number
    comment: string
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
    const { loading } = useNotify()
    const [selectedProvider, setSelectedProvider] = useState<ContragentType | null>(null)

    const { data: magazinesData } = useApi<MagazineType[]>('magazines?status=Активный')
    const { data: contragentsMagazinesData } = useApi<ContragentType[]>(
        'contragent?status=Активный&type=магазин',
    )
    const { data: clientsData } = useApi<ContragentType[]>(
        'contragent?status=Активный&type=реализатор',
    )
    const { data: dispatchesData } = useApi<InvoiceData[]>('release/invoice')
    const [contragents, setContragents] = useState<ContragentType[]>([])
    const [filteredContragents, setFilteredContragents] = useState<ContragentType[] | undefined>([])

    const {
        register,
        handleSubmit: handleSubmitForm,
        control,
        formState: { errors },
        reset,
    } = useForm<DebtTransferInputs>()

    useEffect(() => {
        if (clientsData && contragentsMagazinesData) {
            setContragents([...clientsData, ...contragentsMagazinesData])
        }
    }, [clientsData, contragentsMagazinesData])

    useEffect(() => {
        setFilteredContragents(getFilteredContragents())
    }, [selectedProvider])

    const sendData = (formData: DebtTransferInputs) => {
        const responsePromise: Promise<any> = createDebtTransfer(formData)
        loading(responsePromise)
        responsePromise
            .then(() => {
                reset()
            })
            .catch((error) => {
                console.error('Error creating sale:', error)
            })
    }

    const getFilteredContragents = () => {
        let _filteredContragents
        console.log(selectedProvider?.mainId)

        if (selectedProvider?.type == 'реализатор') {
            const filteredMagazines = magazinesData?.filter(
                (option) => option.clientId == selectedProvider.mainId,
            )
            console.log(filteredMagazines)

            _filteredContragents =
                filteredMagazines?.map((option) => {
                    return contragentsMagazinesData?.find((item) => {
                        return item.mainId == option.id ? item : undefined
                    })
                }) || []
            console.log(_filteredContragents)
        } else if (selectedProvider?.type == 'магазин') {
            _filteredContragents = (magazinesData?.flatMap((option) => {
                if (selectedProvider.mainId == option.id) {
                    return (
                        clientsData?.filter((item) => {
                            return item.mainId == option.clientId
                        }) || []
                    )
                }
                return []
            }) || []) as ContragentType[]
            console.log(_filteredContragents)
        }
        return _filteredContragents as ContragentType[]
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
                                            options={contragents}
                                            getOptionLabel={(option: ContragentType) =>
                                                option.contragentName
                                            }
                                            getOptionValue={(option: ContragentType) =>
                                                `${option.id}`
                                            }
                                            value={contragents?.filter(
                                                (option) => String(option.id) == String(value),
                                            )}
                                            onChange={(selectedOption: ContragentType | null) => {
                                                onChange(selectedOption?.id)
                                                setSelectedProvider(selectedOption)
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
                                    return (
                                        <Select
                                            options={filteredContragents}
                                            getOptionLabel={(option: ContragentType) =>
                                                option.contragentName
                                            }
                                            getOptionValue={(option: ContragentType) =>
                                                `${option.id}`
                                            }
                                            value={
                                                value
                                                    ? filteredContragents?.filter(
                                                          (option) => option?.id == value,
                                                      )
                                                    : null
                                            }
                                            onChange={(selectedOption: ContragentType | null) => {
                                                onChange(selectedOption?.id)
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
                                defaultValue={new Date().toISOString().split('T')[0]}
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
                                            onChange={(selectedOption: InvoiceData | null) => {
                                                onChange(selectedOption?.invoiceNumber)
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
