import {
    Box,
    Button,
    Avatar,
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Tfoot,
    Input,
    Select,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import Drawler from '@/components/Drawler'
import { useNavigate } from 'react-router-dom'
import { MIXERS_BAKINGPRODUCTS_ROUTE } from '@/utils/constants/routes.consts'
import { getAllBakingFacilityUnits } from '@/utils/services/bakingFacilityUnits.service'

const styles = {
    fontSize: '15px',
    borderBottom: '1px solid black',
    textAlign: 'center',
    fontWeight: 'bold',
}

interface FacilityUnit {
    id: number
    facilityUnit: string
}

const MixersPage = () => {
    const [facilityUnit, setFacilityUnits] = useState<FacilityUnit[]>([])

    useEffect(() => {
        getAllBakingFacilityUnits().then((responseData) => {
            setFacilityUnits(responseData)
            console.log(responseData)
        })
    }, [])

    const navigate = useNavigate()
    return (
        <>
            <Box>
                <Box
                    display="flex"
                    justifyContent={'space-between'}
                    flexDirection={'row'}
                    backgroundColor={'rgba(128, 128, 128, 0.1)'}
                    px={5}
                    py={2}
                >
                    <Box width={'100%'}>
                        <Drawler></Drawler>
                        <Button bg={'rgba(217, 217, 217, 1)'} height={'100%'} width={'20%'}>
                            Заявки
                        </Button>
                        <Button
                            height={'100%'}
                            width={'20%'}
                            onClick={() => navigate(MIXERS_BAKINGPRODUCTS_ROUTE)}
                        >
                            Выпечка
                        </Button>
                    </Box>
                    <Avatar size={'md'} bg="teal.500" />
                </Box>
                <Box width={'100%'} height={'100%'} p={5}>
                    <Box marginBottom={10} display={'flex'} justifyContent={'space'}>
                        <Input
                            placeholder="Select Date and Time"
                            size="md"
                            type="datetime-local"
                            width={'20%'}
                            marginRight={30}
                        />
                        <Select placeholder="Цехи" width={'20%'}>
                            {facilityUnit?.map((unit) => (
                                <option key={unit.id} value={unit.id}>
                                    {unit.facilityUnit}
                                </option>
                            ))}
                        </Select>
                    </Box>
                    <Box backgroundColor={'rgba(255, 255, 255, 1)'} width={'100%'} height={'100%'}>
                        <TableContainer>
                            <Table
                                size="sm"
                                variant="unstyled"
                                overflow={'scroll'}
                                style={{ borderCollapse: 'separate', borderSpacing: '0 10px' }}
                            >
                                <Thead>
                                    <Tr>
                                        <Th borderBottom={'1px solid black'} fontSize={'15px'}>
                                            Реализаторы
                                        </Th>
                                        <Th sx={styles}>Заводской</Th>
                                        <Th sx={styles}>Домашний</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td borderBottom={'1px solid black'}>Алишер 1</Td>
                                        <Td sx={styles} isNumeric>
                                            23
                                        </Td>
                                        <Td sx={styles} isNumeric>
                                            25
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Td borderBottom={'1px solid black'}>Алишер 2</Td>
                                        <Td sx={styles} isNumeric>
                                            50
                                        </Td>
                                        <Td sx={styles} isNumeric>
                                            30
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Td borderBottom={'1px solid black'}>Алишер 3</Td>
                                        <Td sx={styles} isNumeric>
                                            10
                                        </Td>
                                        <Td sx={styles} isNumeric>
                                            44
                                        </Td>
                                    </Tr>
                                </Tbody>
                                <Tfoot>
                                    <Tr>
                                        <Th>Итого</Th>
                                        <Th></Th>
                                        <Th isNumeric></Th>
                                    </Tr>
                                </Tfoot>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default MixersPage
