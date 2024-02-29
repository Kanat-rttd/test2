import Dialog from '@/components/Dialog'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import EditModal from './EditModal'
import { useState } from 'react'

const ListTable = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [modal, setModal] = useState({
        isOpen: false,
        onClose: () => setModal({ ...modal, isOpen: false }),
    })

    const data = [
        {
            id: 1,
            realisator: 'Алишер',
            bread: 'Итальянский',
            qty: '20',
            date: '14:20 15.02.2024',
            edit: (
                <EditIcon
                    boxSize={'1.5em'}
                    cursor={'pointer'}
                    onClick={() => setModal({ ...modal, isOpen: true })}
                />
            ),
            delete: (
                <DeleteIcon boxSize={'1.5em'} color={'red'} cursor={'pointer'} onClick={onOpen} />
            ),
        },
    ]

    return (
        <>
            <TableContainer>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>№</Th>
                            <Th>Реализатор</Th>
                            <Th>Виды хлеба</Th>
                            <Th>Количество </Th>
                            <Th>Дата и время</Th>
                            <Th>Действия</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((row) => {
                            return (
                                <Tr key={row.id}>
                                    <Td>{row.id}</Td>
                                    <Td>{row.realisator}</Td>
                                    <Td>{row.bread}</Td>
                                    <Td>{row.qty}</Td>
                                    <Td>{row.date}</Td>
                                    <Td display={'flex'} gap={'10px'}>
                                        {row.edit}
                                        {row.delete}
                                    </Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
            <EditModal isOpen={modal.isOpen} onClose={modal.onClose} />
            <Dialog
                isOpen={isOpen}
                onClose={onClose}
                header="Удалить"
                body="Вы уверены? Вы не сможете отменить это действие впоследствии."
                actionBtn={onClose}
                actionText="Удалить"
            />
        </>
    )
}

export default ListTable
