import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalOverlay,
    InputGroup,
    Input,
    FormControl,
    FormErrorMessage,
    Box,
    Select,
} from '@chakra-ui/react'

// import Select from 'react-select'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { createDepartPersonal, updateDepartPersonal } from '@/utils/services/departPersonal.service'
import { useNotify } from '@/utils/providers/ToastProvider'
import StatusSelect from '@/components/shared/StatusSelect'
import { DepartPersonalType } from '@/utils/types/departPersonal.types'
import { FacilityUnit } from '@/utils/types/product.types'
import { useApi } from '@/utils/services/axios'

interface DepartPesonalAddModalProps {
    data: DepartPersonalType | undefined
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
}

const DepartPersonalModal = ({ data, isOpen, onClose, onSuccess }: DepartPesonalAddModalProps) => {
    const { loading } = useNotify()
    const { data: facilityUnits } = useApi<FacilityUnit[] | undefined>('mixers')
    const {
        register,
        handleSubmit: handleSubmitForm,
        // control,
        setValue,
        setError,
        formState: { errors },
        reset,
    } = useForm<DepartPersonalType>()

    useEffect(() => {
        if (data) {
            Object.entries(data).forEach(([key, value]) => {
                setValue(key as keyof DepartPersonalType, value)
            })
        } else {
            reset()
        }
    }, [data, isOpen, reset])

    const sendData = (formData: DepartPersonalType) => {
        const responsePromise: Promise<any> = data
            ? updateDepartPersonal(data.id, formData)
            : createDepartPersonal(formData)
        loading(responsePromise)

        responsePromise
            .then(() => {
                reset()
                onSuccess()
                handleClose()
            })
            .catch((error) => {
                console.log(error)
                setError(error.response.data.field, {
                    message: error.response.data.message || 'Ошибка',
                })
            })
    }

    const handleClose = () => {
        onClose()
        reset()
    }

    return (
        <>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
                <ModalContent>
                    <ModalHeader>{data ? 'Редактировать' : 'Добавить'} цехперсонал</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display={'flex'} flexDirection={'column'} gap={3}>
                        <form
                            onSubmit={handleSubmitForm(sendData)}
                            style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
                        >
                            <FormControl isInvalid={!!errors.name}>
                                <InputGroup>
                                    <Input
                                        {...register('name', {
                                            required: 'Поле является обязательным',
                                        })}
                                        autoComplete="off"
                                        placeholder="Имя *"
                                        type="text"
                                    />
                                </InputGroup>
                                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.surname}>
                                <InputGroup>
                                    <Input
                                        {...register('surname', {
                                            required: 'Поле является обязательным',
                                        })}
                                        autoComplete="off"
                                        placeholder="Фамилия *"
                                        type="text"
                                    />
                                </InputGroup>
                                <FormErrorMessage>{errors.surname?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.bakingFacilityUnitId}>
                                <Select
                                    placeholder="Выберите цех"
                                    defaultValue={data?.bakingFacilityUnit.id}
                                    {...register('bakingFacilityUnitId', {
                                        required: 'Поле является обязательным',
                                    })}
                                >
                                    {facilityUnits?.map((unit, index) => (
                                        <option key={index} value={unit.id}>
                                            {unit.facilityUnit}
                                        </option>
                                    ))}
                                </Select>
                                <FormErrorMessage>
                                    {errors.bakingFacilityUnitId?.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.userClass}>
                                <InputGroup>
                                    <Input
                                        {...register('userClass', {
                                            required: 'Поле является обязательным',
                                        })}
                                        autoComplete="off"
                                        placeholder="Должность *"
                                        type="text"
                                    />
                                </InputGroup>
                                <FormErrorMessage>{errors.userClass?.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.status}>
                                <StatusSelect
                                    {...register('status', {
                                        required: 'Поле является обязательным',
                                    })}
                                />
                                <FormErrorMessage>{errors.status?.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.fixSalary}>
                                <InputGroup>
                                    <Input
                                        {...register('fixSalary', {
                                            required: 'Поле является обязательным',
                                            maxLength: {
                                                value: 10,
                                                message: 'Максимальная длина 10 символов',
                                            },
                                        })}
                                        autoComplete="off"
                                        placeholder="Фикс ЗП. *"
                                        type="number"
                                    />
                                </InputGroup>
                                <FormErrorMessage>{errors.fixSalary?.message}</FormErrorMessage>
                            </FormControl>
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
                                    value={data ? 'Редактировать' : 'Добавить'}
                                />
                            </Box>
                        </form>
                    </ModalBody>
                    {/* <ModalFooter gap={3}>
                        <Button onClick={handleClose} colorScheme="red">
                            Отмена
                        </Button>
                        <Button colorScheme="purple" onClick={handleSubmitForm(sendData)}>
                            {data ? 'Редактировать' : 'Добавить'}
                        </Button>
                    </ModalFooter> */}
                </ModalContent>
            </Modal>
        </>
    )
}

export default DepartPersonalModal
