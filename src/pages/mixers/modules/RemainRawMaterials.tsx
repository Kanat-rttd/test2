import { Table, Tr, Th, Tbody, Td, Box, Select } from '@chakra-ui/react'
import { TableContainer, Tfoot, Thead } from '@/components/ui'
import UniversalComponent from '@/components/ui/UniversalComponent'
import { useApi } from '@/utils/services/axios'
import DateRange from '@/components/DateRange'
import { useURLParameters } from '@/utils/hooks/useURLParameters'

type RemainRawMaterials = {
    id: number
    category: string
    unitOfMeasure: string
    openingStock: number
    consumption: number
    incoming: string
    adjustmentPeriod: number
    closingStock: number
}[]

type Totals = {
    openingStock: number
    consumption: number
    incoming: number
    adjustmentPeriod: number
    closingStock: number
}

type Remain = {
    data: RemainRawMaterials
    totals: Totals
}

const RemainRawMaterials = () => {
    const { getURLs } = useURLParameters()
    const { data: remainRawMaterials } = useApi<Remain>(
        `reports/remainRawMaterials?${getURLs().toString()}`,
    )

    console.log(remainRawMaterials)

    return (
        <>
            <UniversalComponent>
                <Box display="flex" flexDirection="column" p={5} mt={1}>
                    <Box marginBottom={5} display={'flex'} justifyContent={'space-between'}>
                        <Box display={'flex'} gap={'15px'} width={'fit-content'}>
                            <DateRange />
                            <Select
                                size={'sm'}
                                borderRadius={5}
                                placeholder="Название"
                                width={'fit-content'}
                                name="status"
                            >
                                <option value="1">Активен</option>
                                <option value="0">Приостановлен</option>
                            </Select>
                        </Box>
                    </Box>
                    <TableContainer style={{ width: '100%', overflowY: 'auto' }}>
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>№</Th>
                                    <Th>Название</Th>
                                    <Th>Остаток на начало</Th>
                                    <Th>Расход</Th>
                                    <Th>Приход</Th>
                                    <Th>Остаток на конец</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {remainRawMaterials?.data?.length ? (
                                    remainRawMaterials.data?.map((product, index) => {
                                        return (
                                            <Tr key={index}>
                                                <Td>{product.id}</Td>
                                                <Td>{product.category}</Td>
                                                <Td>{product.openingStock}</Td>
                                                <Td>{product.consumption}</Td>
                                                <Td>{product.incoming}</Td>
                                                <Td>{product.closingStock}</Td>
                                            </Tr>
                                        )
                                    })
                                ) : (
                                    <Tr>
                                        <Td>Нет данных</Td>
                                    </Tr>
                                )}
                            </Tbody>
                            <Tfoot>
                                <Tr color={'#000'} fontSize={15} fontWeight={'bold'}>
                                    <Td>Итого</Td>
                                    <Td></Td>
                                    <Td>{remainRawMaterials?.totals?.openingStock}</Td>
                                    <Td>{remainRawMaterials?.totals?.consumption}</Td>
                                    <Td>{remainRawMaterials?.totals?.incoming}</Td>
                                    <Td>{remainRawMaterials?.totals?.closingStock}</Td>
                                </Tr>
                            </Tfoot>
                        </Table>
                    </TableContainer>
                </Box>
            </UniversalComponent>
        </>
    )
}

export default RemainRawMaterials
