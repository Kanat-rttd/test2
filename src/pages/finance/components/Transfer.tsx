import { Box, Button, FormControl, FormErrorMessage, Input, Textarea } from '@chakra-ui/react'
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import { TransferInputs } from '@/utils/types/finance.types'
import { createTransfer } from '@/utils/services/finance.service'
import { useNotify } from '@/utils/providers/ToastProvider'

const account = [
    {
        id: 1,
        name: 'Счёт 1',
    },
    {
        id: 2,
        name: 'Счёт 2',
    },
]

interface Account {
    id: number
    name: string
}

const Transfer = () => {
    const { success } = useNotify()
    const {
        register,
        handleSubmit: handleSubmitForm,
        control,
        formState: { errors },
        // reset,
    } = useForm<TransferInputs>()

    const sendData = (formData: TransferInputs) => {
        console.log(formData)
        createTransfer(formData)
            .then((res) => {
                console.log(res)
                success('')
            })
            .catch((error) => {
                console.error('Error creating sale:', error)
            })
    }

    return (
        <Box display={'flex'} flexDirection={'column'} gap={4}>
            <FormControl isInvalid={!!errors.amount}>
                <Input
                    maxLength={20}
                    {...register('amount', { required: 'Поле является обязательным' })}
                    autoComplete="off"
                    placeholder="Сумма *"
                    type="number"
                />
                <FormErrorMessage>{errors.amount?.message}</FormErrorMessage>
            </FormControl>

            <FormControl>
                <Input
                    {...register('date', { required: 'Поле является обязательным' })}
                    autoComplete="off"
                    placeholder="Дата *"
                    type="date"
                />
            </FormControl>

            <FormControl isInvalid={!!errors.fromAccount}>
                <Controller
                    name="fromAccount"
                    control={control}
                    rules={{ required: 'Поля является обязательным' }}
                    render={({ field }) => {
                        const { onChange, value } = field
                        return (
                            <Select
                                options={account}
                                getOptionValue={(option: Account) => `${option.id}`}
                                getOptionLabel={(option: Account) => option.name}
                                value={account?.filter((option) => String(option.name) == value)}
                                onChange={(val: Account) => onChange(val?.name)}
                                placeholder="Со счета*"
                                isClearable
                                isSearchable
                            />
                        )
                    }}
                />
                <FormErrorMessage>{errors.fromAccount?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.toAccount}>
                <Controller
                    name="toAccount"
                    control={control}
                    rules={{ required: 'Поля является обязательным' }}
                    render={({ field }) => {
                        const { onChange, value } = field
                        return (
                            <Select
                                options={account}
                                getOptionValue={(option: Account) => `${option.id}`}
                                getOptionLabel={(option: Account) => option.name}
                                value={account?.filter((option) => String(option.name) == value)}
                                onChange={(val: Account) => onChange(val?.name)}
                                placeholder="На счет*"
                                isClearable
                                isSearchable
                            />
                        )
                    }}
                />
                <FormErrorMessage>{errors.toAccount?.message}</FormErrorMessage>
            </FormControl>

            <Textarea
                placeholder="Комментарий"
                maxLength={50}
                size="sm"
                {...register('comment')}
                resize="none"
            />

            <Box style={{ width: '100%', textAlign: 'center' }}>
                <Button
                    onClick={handleSubmitForm(sendData)}
                    style={{ background: '#29647C', color: '#fff' }}
                >
                    Отправить
                </Button>
            </Box>
        </Box>
    )
}

export default Transfer
